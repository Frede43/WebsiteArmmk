from django.db import models
from ckeditor.fields import RichTextField
from ckeditor_uploader.fields import RichTextUploadingField

class HeroSlide(models.Model):
    title = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255, blank=True, null=True)
    title_es = models.CharField(max_length=255, blank=True, null=True)
    
    subtitle = RichTextField()
    subtitle_en = RichTextField(blank=True, null=True)
    subtitle_es = RichTextField(blank=True, null=True)
    
    image = models.ImageField(upload_to='hero_slides/', blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Hero Slide"
        verbose_name_plural = "Hero Slides"

    def __str__(self):
        return self.title

class Activity(models.Model):
    slug = models.SlugField(unique=True, help_text="URL unique de l'activité")
    
    title = models.CharField(max_length=200)
    title_en = models.CharField(max_length=200, blank=True, null=True)
    title_es = models.CharField(max_length=200, blank=True, null=True)
    
    short_desc = models.CharField(max_length=255, help_text="Description courte")
    short_desc_en = models.CharField(max_length=255, blank=True, null=True)
    short_desc_es = models.CharField(max_length=255, blank=True, null=True)
    
    description = RichTextUploadingField()
    description_en = RichTextUploadingField(blank=True, null=True)
    description_es = RichTextUploadingField(blank=True, null=True)
    
    icon = models.CharField(max_length=50, help_text="Nom de l'icone Lucide (ex: MessageCircle)")
    color = models.CharField(max_length=20, help_text="Code couleur hex (ex: #002D62)")
    
    tag = models.CharField(max_length=50)
    tag_en = models.CharField(max_length=50, blank=True, null=True)
    tag_es = models.CharField(max_length=50, blank=True, null=True)
    
    next_event = models.CharField(max_length=150, blank=True, null=True, help_text="Texte libre indiquant la date du prochain evenement")
    next_event_en = models.CharField(max_length=150, blank=True, null=True)
    next_event_es = models.CharField(max_length=150, blank=True, null=True)
    
    location = models.CharField(max_length=200)
    location_en = models.CharField(max_length=200, blank=True, null=True)
    location_es = models.CharField(max_length=200, blank=True, null=True)
    
    participants = models.PositiveIntegerField(default=0)
    image = models.ImageField(upload_to='activities/', blank=True, null=True)
    achievements = models.JSONField(default=list, help_text="Liste des realisations (format JSON)") 

    class Meta:
        verbose_name = "Activite"
        verbose_name_plural = "Activites"

    def __str__(self):
        return self.title

class Event(models.Model):
    EVENT_TYPES = (
        ('dialogue', 'Dialogue'),
        ('formation', 'Formation'),
        ('soutien', 'Soutien'),
        ('commemoration', 'Commemoration'),
        ('gouvernance', 'Gouvernance'),
    )
    title = models.CharField(max_length=200)
    title_en = models.CharField(max_length=200, blank=True, null=True)
    title_es = models.CharField(max_length=200, blank=True, null=True)
    
    description = RichTextUploadingField(blank=True, null=True)
    description_en = RichTextUploadingField(blank=True, null=True)
    description_es = RichTextUploadingField(blank=True, null=True)
    
    type = models.CharField(max_length=50, choices=EVENT_TYPES)
    date = models.DateField()
    
    time = models.CharField(max_length=100, blank=True, null=True, help_text="Texte libre pour l'horaire")
    time_en = models.CharField(max_length=100, blank=True, null=True)
    time_es = models.CharField(max_length=100, blank=True, null=True)
    
    location = models.CharField(max_length=200)
    location_en = models.CharField(max_length=200, blank=True, null=True)
    location_es = models.CharField(max_length=200, blank=True, null=True)
    
    activity = models.ForeignKey(Activity, on_delete=models.SET_NULL, null=True, blank=True, related_name='events')

    class Meta:
        ordering = ['date']
        verbose_name = "Evenement"
        verbose_name_plural = "Evenements"

    def __str__(self):
        return f"{self.title} - {self.date.strftime('%d/%m/%Y')}"

class Album(models.Model):
    title = models.CharField(max_length=200)
    title_en = models.CharField(max_length=200, blank=True, null=True)
    title_es = models.CharField(max_length=200, blank=True, null=True)
    year = models.IntegerField(help_text="Annee de l'album")
    order = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['-year', 'order']
        verbose_name = "Album Galerie"
        verbose_name_plural = "Albums Galerie"

    def __str__(self):
        return f"{self.year} - {self.title}"

class Photo(models.Model):
    album = models.ForeignKey(Album, related_name='photos', on_delete=models.CASCADE)
    src = models.ImageField(upload_to='albums/', blank=True, null=True)
    alt = models.CharField(max_length=255, blank=True, help_text="Description de l'image (SEO)")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Photo"
        verbose_name_plural = 'Photos'

class Video(models.Model):
    album = models.ForeignKey(Album, related_name='videos', on_delete=models.CASCADE)
    title = models.CharField(max_length=255, blank=True)
    video_url = models.URLField(help_text='Lien YouTube ou Vimeo')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'Video Galerie'
        verbose_name_plural = 'Videos Galerie'


class Article(models.Model):
    slug = models.SlugField(unique=True)
    
    title = models.CharField(max_length=200)
    title_en = models.CharField(max_length=200, blank=True, null=True)
    title_es = models.CharField(max_length=200, blank=True, null=True)
    
    category = models.CharField(max_length=100, help_text="Categorie affichee (ex: Memoire)")
    category_en = models.CharField(max_length=100, blank=True, null=True)
    category_es = models.CharField(max_length=100, blank=True, null=True)
    
    tag = models.CharField(max_length=50, help_text="Sert uniquement aux couleurs, ex: commemoration, formation")
    date = models.DateField()
    image = models.ImageField(upload_to='articles/', blank=True, null=True)
    video_url = models.URLField(blank=True, null=True, help_text="Lien YouTube ou Vimeo (ex: https://www.youtube.com/watch?v=...)")
    
    excerpt = RichTextUploadingField(help_text="Extrait visible sur la carte")
    excerpt_en = RichTextUploadingField(blank=True, null=True)
    excerpt_es = RichTextUploadingField(blank=True, null=True)
    
    content = RichTextUploadingField(help_text="Contenu complet de l'article")
    content_en = RichTextUploadingField(blank=True, null=True)
    content_es = RichTextUploadingField(blank=True, null=True)

    class Meta:
        ordering = ['-date']
        verbose_name = "Article / Actualite"
        verbose_name_plural = "Articles / Actualites"

    def __str__(self):
        return self.title

class Story(models.Model):
    name = models.CharField(max_length=150, help_text="Nom du temoin")
    age = models.CharField(max_length=10, blank=True)
    
    role = models.CharField(max_length=100, blank=True)
    role_en = models.CharField(max_length=100, blank=True, null=True)
    role_es = models.CharField(max_length=100, blank=True, null=True)
    
    image = models.ImageField(upload_to='stories/', blank=True, null=True)
    
    teaser = models.CharField(max_length=255, help_text="Citation courte d'accroche")
    teaser_en = models.CharField(max_length=255, blank=True, null=True)
    teaser_es = models.CharField(max_length=255, blank=True, null=True)
    
    excerpt = RichTextUploadingField(help_text="Extrait pour la carte")
    excerpt_en = RichTextUploadingField(blank=True, null=True)
    excerpt_es = RichTextUploadingField(blank=True, null=True)
    
    full_text = RichTextUploadingField(help_text="Temoignage complet")
    full_text_en = RichTextUploadingField(blank=True, null=True)
    full_text_es = RichTextUploadingField(blank=True, null=True)

    class Meta:
        verbose_name = "Temoignage"
        verbose_name_plural = "Temoignages"

    def __str__(self):
        return f"Temoignage de {self.name}"

class TeamMember(models.Model):
    name = models.CharField(max_length=150)
    initials = models.CharField(max_length=10)
    role = models.CharField(max_length=200)
    role_en = models.CharField(max_length=200, blank=True, null=True)
    role_es = models.CharField(max_length=200, blank=True, null=True)
    image = models.ImageField(upload_to='team/', blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Membre de l'equipe"
        verbose_name_plural = "Membres de l'equipe"

    def __str__(self):
        return self.name

class ProgrammeItem(models.Model):
    time = models.CharField(max_length=100, help_text="Horaire direct (ex: 10h00 - 12h00)")
    event = models.CharField(max_length=255, help_text="Titre de la session")
    event_en = models.CharField(max_length=255, blank=True, null=True)
    event_es = models.CharField(max_length=255, blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Point du Programme"
        verbose_name_plural = "Programme des commemorations"

class PastEdition(models.Model):
    year = models.CharField(max_length=4)
    count = models.PositiveIntegerField(help_text="Nombre de participants")
    highlight = RichTextUploadingField(help_text="Fait marquant de l'edition")
    highlight_en = RichTextUploadingField(blank=True, null=True)
    highlight_es = RichTextUploadingField(blank=True, null=True)

    class Meta:
        ordering = ['-year']
        verbose_name = "Edition passee"
        verbose_name_plural = "Editions passees"

class SupportForm(models.Model):
    title = models.CharField(max_length=100)
    title_en = models.CharField(max_length=100, blank=True, null=True)
    title_es = models.CharField(max_length=100, blank=True, null=True)
    description = RichTextUploadingField()
    description_en = RichTextUploadingField(blank=True, null=True)
    description_es = RichTextUploadingField(blank=True, null=True)
    icon_name = models.CharField(max_length=50, help_text="Nom lucide-react (ex: HandHeart)")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Forme de Soutien"
        verbose_name_plural = "Formes de Soutien"

class PaymentMethod(models.Model):
    label = models.CharField(max_length=100)
    label_en = models.CharField(max_length=100, blank=True, null=True)
    label_es = models.CharField(max_length=100, blank=True, null=True)
    detail = models.CharField(max_length=200)
    detail_en = models.CharField(max_length=200, blank=True, null=True)
    detail_es = models.CharField(max_length=200, blank=True, null=True)
    icon_name = models.CharField(max_length=50)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Methode de paiement"
        verbose_name_plural = "Methodes de paiement"

class SiteConfiguration(models.Model):
    site_name = models.CharField(max_length=100, default="ARMMK")
    site_logo = models.ImageField(upload_to='settings/', blank=True, null=True)
    about_text = RichTextUploadingField(blank=True, help_text="Texte d'a propos global (footer/home)")
    about_text_en = RichTextUploadingField(blank=True, null=True)
    about_text_es = RichTextUploadingField(blank=True, null=True)
    
    # Page A Propos
    about_history_title = models.CharField(max_length=255, blank=True, default="Née de la douleur, portée par la dignité")
    about_history_title_en = models.CharField(max_length=255, blank=True, null=True)
    about_history_title_es = models.CharField(max_length=255, blank=True, null=True)
    
    about_history_content = RichTextUploadingField(blank=True)
    about_history_content_en = RichTextUploadingField(blank=True, null=True)
    about_history_content_es = RichTextUploadingField(blank=True, null=True)
    
    about_history_image = models.ImageField(upload_to='about/', blank=True, null=True)
    
    mission_text = RichTextUploadingField(blank=True)
    mission_text_en = RichTextUploadingField(blank=True, null=True)
    mission_text_es = RichTextUploadingField(blank=True, null=True)
    
    vision_text = RichTextUploadingField(blank=True)
    vision_text_en = RichTextUploadingField(blank=True, null=True)
    vision_text_es = RichTextUploadingField(blank=True, null=True)

    # Page Massacre
    massacre_intro_title = models.CharField(max_length=255, blank=True, default="Un crime contre l'humanité en plein cà…â€œur du Congo")
    massacre_intro_title_en = models.CharField(max_length=255, blank=True, null=True)
    massacre_intro_title_es = models.CharField(max_length=255, blank=True, null=True)
    
    massacre_intro_content = RichTextUploadingField(blank=True)
    massacre_intro_content_en = RichTextUploadingField(blank=True, null=True)
    massacre_intro_content_es = RichTextUploadingField(blank=True, null=True)
    
    massacre_intro_image = models.ImageField(upload_to='massacre/', blank=True, null=True)

    contact_email = models.EmailField(default="contact@armmk.org")
    contact_phone = models.CharField(max_length=50, blank=True)
    address = models.CharField(max_length=255, blank=True)
    
    map_latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    map_longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    
    facebook_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    youtube_url = models.URLField(blank=True)

    class Meta:
        verbose_name = "Configuration du Site"
        verbose_name_plural = "Configuration du Site"



    def __str__(self):
        return "Parametres Generaux du Site"

class ContactMessage(models.Model):
    first_name = models.CharField(max_length=100, verbose_name="Prenom")
    last_name = models.CharField(max_length=100, blank=True, verbose_name="Nom")
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True, verbose_name="Sujet")
    message = RichTextUploadingField()
    is_read = models.BooleanField(default=False, verbose_name="Lu ?")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Message de Contact"
        verbose_name_plural = "Messages de Contact"

    def __str__(self):
        return f"Message de {self.first_name} ({self.created_at.strftime('%d/%m/%Y')})"

class DonationIntent(models.Model):
    first_name = models.CharField(max_length=100, verbose_name="Prenom et nom")
    email = models.EmailField()
    amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, verbose_name="Montant ($)")
    is_monthly = models.BooleanField(default=False, verbose_name="Don Mensuel ?")
    status = models.CharField(max_length=50, default='pending', choices=(
        ('pending', 'En attente'),
        ('contacted', 'Contacte / En cours'),
        ('completed', 'Finalise'),
    ), verbose_name="Statut")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Promesse de Don"
        verbose_name_plural = "Promesses de Don"

    def __str__(self):
        return f"Promesse de {self.amount}$ par {self.first_name}"

class TestimonySubmission(models.Model):
    name = models.CharField(max_length=200, verbose_name="Nom et Prenom")
    contact_info = models.CharField(max_length=200, blank=True, verbose_name="Contact")
    relation = models.CharField(max_length=100, verbose_name="Lien avec le massacre")
    message = RichTextUploadingField(verbose_name="Temoignage")
    is_reviewed = models.BooleanField(default=False, verbose_name="Valide ?")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Soumission de Temoignage"
        verbose_name_plural = "Soumissions de Temoignages"

    def __str__(self):
        return f"Temoignage recu de {self.name}"

class Value(models.Model):
    label = models.CharField(max_length=100)
    label_en = models.CharField(max_length=100, blank=True, null=True)
    label_es = models.CharField(max_length=100, blank=True, null=True)
    desc = RichTextUploadingField()
    desc_en = RichTextUploadingField(blank=True, null=True)
    desc_es = RichTextUploadingField(blank=True, null=True)
    icon_name = models.CharField(max_length=50, default="Heart", help_text="Nom de l'icône (ex: Heart, Scale, Handshake, Shield)")
    order = models.PositiveIntegerField(default=0)
    class Meta:
        ordering = ['order']
        verbose_name = "Valeur / Croyance"
        verbose_name_plural = "Valeurs / Croyances"
    def __str__(self):
        return self.label

class Document(models.Model):
    CATEGORY_CHOICES = [
        ('rapports', 'Rapports annuels'),
        ('communiques', 'Communiques'),
        ('archives', 'Archives historiques'),
        ('ressources', 'Ressources pedagogiques'),
    ]
    FORMAT_CHOICES = [('PDF', 'PDF'), ('DOC', 'DOC'), ('XLSX', 'XLSX')]
    LANGUAGE_CHOICES = [('FR', 'Francais'), ('EN', 'English'), ('SW', 'Swahili')]

    title = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255, blank=True, null=True)
    title_es = models.CharField(max_length=255, blank=True, null=True)
    
    description = RichTextUploadingField()
    description_en = RichTextUploadingField(blank=True, null=True)
    description_es = RichTextUploadingField(blank=True, null=True)
    
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    category_en = models.CharField(max_length=20, blank=True, null=True)
    category_es = models.CharField(max_length=20, blank=True, null=True)
    date = models.CharField(max_length=50) 
    size = models.CharField(max_length=20) 
    pages = models.PositiveIntegerField()
    format = models.CharField(max_length=10, choices=FORMAT_CHOICES)
    language = models.CharField(max_length=10, choices=LANGUAGE_CHOICES)
    file = models.FileField(upload_to='documents/', blank=True, null=True)
    downloadUrl = models.URLField(blank=True, help_text="Lien externe (si pas de fichier)")
    featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['-featured', 'order', '-id']
        verbose_name = "Document / Rapport"
        verbose_name_plural = "Documents / Rapports"
    def __str__(self):
        return self.title

class TimelineEvent(models.Model):
    date = models.CharField(max_length=50, help_text="Ex: 30 DEC. 1998")
    title = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255, blank=True, null=True)
    title_es = models.CharField(max_length=255, blank=True, null=True)
    text = RichTextUploadingField()
    text_en = RichTextUploadingField(blank=True, null=True)
    text_es = RichTextUploadingField(blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    class Meta:
        ordering = ['order']
        verbose_name = "Event Chronologique"
        verbose_name_plural = "Frise Chronologique (Massacre)"
    def __str__(self):
        return self.title

class Partner(models.Model):
    name = models.CharField(max_length=200)
    type = models.CharField(max_length=100, help_text="Ex: ONG Internationale")
    type_en = models.CharField(max_length=100, blank=True, null=True)
    type_es = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100)
    country_en = models.CharField(max_length=100, blank=True, null=True)
    country_es = models.CharField(max_length=100, blank=True, null=True)
    description = RichTextUploadingField()
    description_en = RichTextUploadingField(blank=True, null=True)
    description_es = RichTextUploadingField(blank=True, null=True)
    href = models.URLField(blank=True, default="#")
    order = models.PositiveIntegerField(default=0)
    class Meta:
        ordering = ['order']
        verbose_name = "Partenaire"
        verbose_name_plural = "Partenaires"
    def __str__(self):
        return self.name

class Statistic(models.Model):
    label = models.CharField(max_length=100)
    label_en = models.CharField(max_length=100, blank=True, null=True)
    label_es = models.CharField(max_length=100, blank=True, null=True)
    value = models.CharField(max_length=50) 
    sub = models.CharField(max_length=100, blank=True)
    sub_en = models.CharField(max_length=100, blank=True, null=True)
    sub_es = models.CharField(max_length=100, blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Statistique"
        verbose_name_plural = "Statistiques"
    def __str__(self):
        return f"{self.value} {self.label}"

class CommemorationSection(models.Model):
    title = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255, blank=True, null=True)
    title_es = models.CharField(max_length=255, blank=True, null=True)

    description = RichTextUploadingField()
    description_en = RichTextUploadingField(blank=True, null=True)
    description_es = RichTextUploadingField(blank=True, null=True)
    
    date_text = models.CharField(max_length=100, help_text="Ex: 30 Décembre 2025 à¢â‚¬â€œ 2 Janvier 2026")
    date_text_en = models.CharField(max_length=100, blank=True, null=True)
    date_text_es = models.CharField(max_length=100, blank=True, null=True)
    
    location = models.CharField(max_length=200)
    location_en = models.CharField(max_length=200, blank=True, null=True)
    location_es = models.CharField(max_length=200, blank=True, null=True)
    
    countdown_day = models.CharField(max_length=10, help_text="Ex: 30")
    countdown_month_year = models.CharField(max_length=100, help_text="Ex: Décembre 2026")
    countdown_month_year_en = models.CharField(max_length=100, blank=True, null=True)
    countdown_month_year_es = models.CharField(max_length=100, blank=True, null=True)
    image = models.ImageField(upload_to='commemoration/', blank=True, null=True)

    class Meta:
        verbose_name = "Section Commemoration (Accueil)"
        verbose_name_plural = "Section Commemoration (Accueil)"
    def __str__(self):
        return self.title

class HomeCTAAction(models.Model):
    icon_name = models.CharField(max_length=50, help_text="Nom Lucide icon")
    title = models.CharField(max_length=100)
    title_en = models.CharField(max_length=100, blank=True, null=True)
    title_es = models.CharField(max_length=100, blank=True, null=True)
    description = RichTextUploadingField()
    description_en = RichTextUploadingField(blank=True, null=True)
    description_es = RichTextUploadingField(blank=True, null=True)
    href = models.CharField(max_length=255)
    is_primary = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Action CTA (Accueil)"
        verbose_name_plural = "Actions CTA (Accueil)"
    def __str__(self):
        return self.title

class NavLink(models.Model):
    label = models.CharField(max_length=100)
    label_en = models.CharField(max_length=100, blank=True, null=True)
    label_es = models.CharField(max_length=100, blank=True, null=True)
    href = models.CharField(max_length=255)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
    description = models.CharField(max_length=255, blank=True)
    description_en = models.CharField(max_length=255, blank=True, null=True)
    description_es = models.CharField(max_length=255, blank=True, null=True)
    is_overflow = models.BooleanField(default=False, help_text="Affiché dans le menu 'Plus'")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Lien de Navigation"
        verbose_name_plural = "Liens de Navigation"
    def __str__(self):
        return self.label

class MemorialSite(models.Model):
    badge = models.CharField(max_length=100, default="Lieu de mémoire")
    badge_en = models.CharField(max_length=100, blank=True, null=True)
    badge_es = models.CharField(max_length=100, blank=True, null=True)
    
    title = models.CharField(max_length=255, default="Le site mémorial de Makobola")
    title_en = models.CharField(max_length=255, blank=True, null=True)
    title_es = models.CharField(max_length=255, blank=True, null=True)
    
    description = RichTextUploadingField()
    description_en = RichTextUploadingField(blank=True, null=True)
    description_es = RichTextUploadingField(blank=True, null=True)
    
    location = models.CharField(max_length=255, default="Makobola, Territoire de Fizi, Sud-Kivu, RDC")
    location_en = models.CharField(max_length=255, blank=True, null=True)
    location_es = models.CharField(max_length=255, blank=True, null=True)
    
    image = models.ImageField(upload_to='memorial/', blank=True, null=True)

    class Meta:
        verbose_name = "Lieu de Memoire"
        verbose_name_plural = "Lieux de Memoire"



    def __str__(self):
        return self.title

class DonationImpact(models.Model):
    amount = models.CharField(max_length=50, help_text="Ex: $10")
    impact = models.CharField(max_length=255)
    impact_en = models.CharField(max_length=255, blank=True, null=True)
    impact_es = models.CharField(max_length=255, blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Impact de don"
        verbose_name_plural = "Impacts de don"

    def __str__(self):
        return f"{self.amount} - {self.impact}"









