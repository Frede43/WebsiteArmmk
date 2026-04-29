from deep_translator import GoogleTranslator
import logging

logger = logging.getLogger(__name__)

def auto_translate_obj(obj, fields_to_translate):
    """
    Traduit automatiquement les champs d'un objet de FR vers EN et ES.
    fields_to_translate: liste des noms de champs de base (ex: ['title', 'description'])
    """
    try:
        translator_en = GoogleTranslator(source='fr', target='en')
        translator_es = GoogleTranslator(source='fr', target='es')
    except Exception as e:
        logger.error(f"Erreur initialisation traducteur: {e}")
        return False
    
    changed = False
    for field in fields_to_translate:
        source_val = getattr(obj, field, None)
        
        # On ne traduit que si le champ source est rempli et est une chaîne
        if source_val and isinstance(source_val, str) and len(source_val.strip()) > 0:
            
            # Traduction vers l'Anglais
            en_field = f"{field}_en"
            if hasattr(obj, en_field):
                current_en = getattr(obj, en_field)
                # On ne traduit que si le champ cible est vide
                if not current_en or len(current_en.strip()) == 0:
                    try:
                        translated = translator_en.translate(source_val)
                        setattr(obj, en_field, translated)
                        changed = True
                    except Exception as e:
                        logger.error(f"Erreur traduction EN pour {field}: {e}")
            
            # Traduction vers l'Espagnol
            es_field = f"{field}_es"
            if hasattr(obj, es_field):
                current_es = getattr(obj, es_field)
                if not current_es or len(current_es.strip()) == 0:
                    try:
                        translated = translator_es.translate(source_val)
                        setattr(obj, es_field, translated)
                        changed = True
                    except Exception as e:
                        logger.error(f"Erreur traduction ES pour {field}: {e}")
                        
    if changed:
        obj.save()
    return changed
