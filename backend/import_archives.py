import os
import django
import sys
from datetime import date
from django.utils.text import slugify

# Configuration Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from core.models import Article, Document, TimelineEvent

def run_import():
    print("Début de l'importation des archives...")

    # 1. TIMELINE EVENTS (Frise Chronologique)
    timeline_data = [
        {
            "date": "MARS 2013",
            "title": "Le Dialogue dans les Écoles",
            "title_en": "Dialogue in Schools",
            "text": "Réception du DVD 'Dialogue in Nigeria' et traduction en français. L'ARMMK s'engage activement dans l'éducation des jeunes à la paix et à la communication interreligieuse."
        },
        {
            "date": "AOÛT 2013",
            "title": "Dialogue public à Uvira",
            "title_en": "Public Dialogue in Uvira",
            "text": "Organisation d'un grand dialogue en face-à-face pour favoriser la réconciliation inter-ethnique."
        },
        {
            "date": "AVRIL 2014",
            "title": "Planification Communautaire",
            "title_en": "Community Planning",
            "text": "Réunion communautaire à Bangwe-Makobola pour planifier le vivre-ensemble pacifique et le rejet de la violence."
        }
    ]

    for data in timeline_data:
        TimelineEvent.objects.get_or_create(
            title=data['title'],
            defaults={
                'date': data['date'],
                'title_en': data.get('title_en'),
                'text': data['text'],
            }
        )
    print("Timeline Events importés.")

    # 2. ARTICLES (Actualités)
    articles_data = [
        {
            "title": "Intégration sociale des réfugiés burundais",
            "title_en": "Social Integration of Burundi Refugees",
            "category": "Réconciliation",
            "tag": "formation",
            "date": date(2015, 7, 1),
            "excerpt": "Au camp de Lusenda, l'ARMMK a organisé une rencontre pour l'intégration des réfugiés fuyant la terreur.",
            "content": "En juillet 2015, au camp de Lusenda, l'ARMMK a organisé une rencontre en face-à-face pour l'intégration sociale des réfugiés burundais fuyant la terreur. Une étape majeure pour la cohésion sociale dans le Sud-Kivu. Vidéo documentaire de cette rencontre disponible dans la section Documents.",
        },
        {
            "title": "Cercles de paix Mboko et Kasenya-Makobola",
            "title_en": "Mboko and Kasenya-Makobola Peace Circles",
            "category": "Plaidoyer",
            "tag": "commemoration",
            "date": date(2018, 7, 1),
            "excerpt": "Création de cercles pour l'intégration des réfugiés et la construction communautaire locale.",
            "content": "En juillet 2018, des cercles d'intégration ont été formés à Mboko et Kasenya-Makobola. Ces cercles visent à faciliter l'intégration des réfugiés et à renforcer les liens communautaires après des années de conflit. Le rapport complet est téléchargeable.",
        }
    ]

    for data in articles_data:
        slug = slugify(data['title'])
        Article.objects.get_or_create(
            slug=slug,
            defaults={
                'title': data['title'],
                'title_en': data.get('title_en'),
                'category': data['category'],
                'tag': data['tag'],
                'date': data['date'],
                'excerpt': data['excerpt'],
                'content': data['content'],
            }
        )
    print("Articles d'archives importés.")

    # 3. DOCUMENTS (Rapports)
    documents_data = [
        {
            "title": "Rapport Synthèse (2013-2017) : Dialogue et Réconciliation",
            "title_en": "Summary Report (2013-2017): Dialogue and Reconciliation",
            "description": "Rapport complet retraçant 5 années d'efforts de l'ARMMK et de ses partenaires (ex: Len Traubman) pour la prévention des conflits et le dialogue inter-ethnique au Sud-Kivu.",
            "category": "rapports",
            "date": "Avril 2017",
            "size": "5.2 MB",
            "pages": 45,
            "format": "PDF",
            "language": "EN",
            "downloadUrl": "https://traubman.igc.org/vidnigeriadrcongoeast10.pdf"
        },
        {
            "title": "Rapport : Cercles d'intégration à Mboko (2018)",
            "title_en": "Report: Integration Circles in Mboko",
            "description": "Document de synthèse sur la création des cercles de paix et l'intégration des réfugiés à Mboko et Kasenya-Makobola.",
            "category": "rapports",
            "date": "Juillet 2018",
            "size": "1.1 MB",
            "pages": 12,
            "format": "PDF",
            "language": "FR",
            "downloadUrl": "http://traubman.igc.org/vidnigeriadrcongoeast08.pdf"
        }
    ]

    for data in documents_data:
        Document.objects.get_or_create(
            title=data['title'],
            defaults={
                'title_en': data.get('title_en'),
                'description': data['description'],
                'category': data['category'],
                'date': data['date'],
                'size': data['size'],
                'pages': data['pages'],
                'format': data['format'],
                'language': data['language'],
                'downloadUrl': data['downloadUrl'],
            }
        )
    print("Documents / Rapports importés.")
    print("\nIMPORTATION TERMINÉE AVEC SUCCÈS !")

if __name__ == '__main__':
    run_import()
