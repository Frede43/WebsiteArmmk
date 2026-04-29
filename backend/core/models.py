from django.db import models

class HeroSlide(models.Model):
    title = models.CharField("Titre (FR)", max_length=255)
    title_en = models.CharField("Titre (EN)", max_length=255, blank=True, null=True)
    title_es = models.CharField("Titre (ES)", max_length=255, blank=True, null=True)
    
    subtitle = models.TextField("Sous-titre (FR)")
    subtitle_en = models.TextField("Sous-titre (EN)", blank=True, null=True)
    subtitle_es = models.TextField("Sous-titre (ES)", blank=True, null=True)
    
    image = models.ImageField("Image", upload_to='hero_slides/', blank=True, null=True)
    order = models.PositiveIntegerField("Ordre d'affichage", default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Hero Slide"
        verbose_name_plural = "Hero Slides"

    def __str__(self):
        return self.title

class Activity(models.Model):
    slug = models.SlugField(unique=True, help_text="URL unique de l'activitÃ©")
    
    title = models.CharField("Titre (FR)", max_length=200)
    title_en = models.CharField("Titre (EN)", max_length=200, blank=True, null=True)
    title_es = models.CharField("Titre (ES)", max_length=200, blank=True, null=True)
    
    short_desc = models.CharField("Description courte (FR)", max_length=255, help_text="Description courte")
    short_desc_en = models.CharField("Description courte (EN)", max_length=255, blank=True, null=True)
    short_desc_es = models.CharField("Description courte (ES)", max_length=255, blank=True, null=True)
    
    description = models.TextField("Description complÃ¨te (FR)")
    description_en = models.TextField("Description complÃ¨te (EN)", blank=True, null=True)
    description_es = models.TextField("Description complÃ¨te (ES)", blank=True, null=True)
    
    icon = models.CharField("IcÃ´ne (Lucide)", max_length=50, help_text="Nom de l'icÃ´ne Lucide (ex: MessageCircle)")
    color = models.CharField("Couleur", max_length=20, help_text="Code couleur hex (ex: #002D62)")
    
    tag = models.CharField("Ã‰tiquette (FR)", max_length=50)
    tag_en = models.CharField("Ã‰tiquette (EN)", max_length=50, blank=True, null=True)
    tag_es = models.CharField("Ã‰tiquette (ES)", max_length=50, blank=True, null=True)
    
    next_event = models.CharField("Prochain Ã©vÃ©nement (FR)", max_length=150, blank=True, null=True, help_text="Texte libre indiquant la date du prochain Ã©vÃ©nement")
    next_event_en = models.CharField("Prochain Ã©vÃ©nement (EN)", max_length=150, blank=True, null=True)
    next_event_es = models.CharField("Prochain Ã©vÃ©nement (ES)", max_length=150, blank=True, null=True)
    
    location = models.CharField("Lieu (FR)", max_length=200)
    location_en = models.CharField("Lieu (EN)", max_length=200, blank=True, null=True)
    location_es = models.CharField("Lieu (ES)", max_length=200, blank=True, null=True)
    
    participants = models.PositiveIntegerField("Nombre de participants", default=0)
    image = models.ImageField("Image de couverture", upload_to='activities/', blank=True, null=True)
    video_url = models.URLField("Lien VidÃ©o", blank=True, null=True, help_text="Lien YouTube ou Vimeo (ex: https://www.youtube.com/watch?v=...)")
    achievements = models.JSONField("RÃ©alisations (JSON)", default=list, help_text="Liste des rÃ©alisations (format JSON)") 

    class Meta:
        verbose_name = "ActivitÃ©"
        verbose_name_plural = "ActivitÃ©s"

    def __str__(self):
        return self.title

class Event(models.Model):
    EVENT_TYPES = (
        ('dialogue', 'Dialogue'),
        ('formation', 'Formation'),
        ('soutien', 'Soutien'),
        ('commemoration', 'CommÃ©moration'),
        ('gouvernance', 'Gouvernance'),
    )
    title = models.CharField(max_length=200)
    title_en = models.CharField(max_length=200, blank=True, null=True)
    title_es = models.CharField(max_length=200, blank=True, null=True)
    
    description = models.TextField(blank=True, null=True)
    description_en = models.TextField(blank=True, null=True)
    description_es = models.TextField(blank=True, null=True)
    
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
        verbose_name = "Ã‰vÃ©nement"
        verbose_name_plural = "Ã‰vÃ©nements"

    def __str__(self):
        return f"{self.title} - {self.date.strftime('%d/%m/%Y')}"

class Album(models.Model):
    title = models.CharField(max_length=200)
    title_en = models.CharField(max_length=200, blank=True, null=True)
    title_es = models.CharField(max_length=200, blank=True, null=True)
    year = models.IntegerField(help_text="AnnÃ©e de l'album")
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
        verbose_name_plural = "Photos"

class Video(models.Model):
    album = models.ForeignKey(Album, related_name='videos', on_delete=models.CASCADE)
    title = models.CharField(max_length=255, blank=True)
    video_url = models.URLField(help_text="Lien YouTube ou Vimeo")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "VidÃ©o Galerie"
        verbose_name_plural = "VidÃ©os Galerie"

class Article(models.Model):
    slug = models.SlugField('Slug (URL)', unique=True)

    title = models.CharField('Titre (FR)', max_length=200)
    title_en = models.CharField('Titre (EN)', max_length=200, blank=True, null=True)
    title_es = models.CharField('Titre (ES)', max_length=200, blank=True, null=True)

    category = models.CharField('Catégorie (FR)', max_length=100, help_text='Catégorie affichée (ex: Mémoire)')
    category_en = models.CharField('Catégorie (EN)', max_length=100, blank=True, null=True)
    category_es = models.CharField('Catégorie (ES)', max_length=100, blank=True, null=True)

    tag = models.CharField('Étiquette (Couleur)', max_length=50, help_text='Sert uniquement aux couleurs, ex: commemoration, formation')
    date = models.DateField('Date de publication')

    image = models.ImageField('Image', upload_to='articles/', blank=True, null=True)
    video_url = models.URLField('Lien Vidéo', blank=True, null=True, help_text='Lien YouTube ou Vimeo (ex: https://www.youtube.com/watch?v=...)')

    excerpt = models.TextField('Extrait (FR)', help_text='Extrait visible sur la carte')
    excerpt_en = models.TextField('Extrait (EN)', blank=True, null=True)
    excerpt_es = models.TextField('Extrait (ES)', blank=True, null=True)

    content = models.TextField('Contenu complet (FR)', help_text='Contenu complet de l\'article')
    content_en = models.TextField('Contenu complet (EN)', blank=True, null=True)
    content_es = models.TextField('Contenu complet (ES)', blank=True, null=True)

    class Meta:
        verbose_name = 'Article'
        verbose_name_plural = 'Articles'

    def __str__(self):
        return self.title

class Value(models.Model):
    label = models.CharField(max_length=100)
    label_en = models.CharField(max_length=100, blank=True, null=True)
    label_es = models.CharField(max_length=100, blank=True, null=True)
    desc = models.TextField()
    desc_en = models.TextField(blank=True, null=True)
    desc_es = models.TextField(blank=True, null=True)
    icon_name = models.CharField(max_length=50, default="Heart", help_text="Nom de l'icÃ´ne (ex: Heart, Scale, Handshake, Shield)")
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
        ('communiques', 'CommuniquÃ©s'),
        ('archives', 'Archives historiques'),
        ('ressources', 'Ressources pÃ©dagogiques'),
    ]
    FORMAT_CHOICES = [('PDF', 'PDF'), ('DOC', 'DOC'), ('XLSX', 'XLSX')]
    LANGUAGE_CHOICES = [('FR', 'FranÃ§ais'), ('EN', 'English'), ('SW', 'Swahili')]

    title = models.CharField("Titre (FR)", max_length=255)
    title_en = models.CharField("Titre (EN)", max_length=255, blank=True, null=True)
    title_es = models.CharField("Titre (ES)", max_length=255, blank=True, null=True)
    
    description = models.TextField("Description (FR)")
    description_en = models.TextField("Description (EN)", blank=True, null=True)
    description_es = models.TextField("Description (ES)", blank=True, null=True)
    
    category = models.CharField("CatÃ©gorie (FR)", max_length=20, choices=CATEGORY_CHOICES)
    category_en = models.CharField("CatÃ©gorie (EN)", max_length=20, blank=True, null=True)
    category_es = models.CharField("CatÃ©gorie (ES)", max_length=20, blank=True, null=True)
    date = models.CharField("Date / AnnÃ©e", max_length=50) 
    size = models.CharField("Taille du fichier", max_length=20) 
    pages = models.PositiveIntegerField("Nombre de pages")
    format = models.CharField("Format", max_length=10, choices=FORMAT_CHOICES)
    language = models.CharField("Langue du document", max_length=10, choices=LANGUAGE_CHOICES)
    file = models.FileField("Fichier", upload_to='documents/', blank=True, null=True)
    downloadUrl = models.URLField("Lien de tÃ©lÃ©chargement", blank=True, help_text="Lien externe (si pas de fichier)")
    featured = models.BooleanField("Mis en avant", default=False)
    order = models.PositiveIntegerField("Ordre d'affichage", default=0)

    class Meta:
        ordering = ['-featured', 'order', '-id']
        verbose_name = "Document / Rapport"
        verbose_name_plural = "Documents / Rapports"
    def __str__(self):
        return self.title

class TimelineEvent(models.Model):
    date = models.CharField(max_length=50, help_text="Ex: 30 DÃ‰C. 1998")
    title = models.CharField(max_length=255)
    title_en = models.CharField(max_length=255, blank=True, null=True)
    title_es = models.CharField(max_length=255, blank=True, null=True)
    text = models.TextField()
    text_en = models.TextField(blank=True, null=True)
    text_es = models.TextField(blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    class Meta:
        ordering = ['order']
        verbose_name = "EvÃ¨nement Chronologique"
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
    description = models.TextField()
    description_en = models.TextField(blank=True, null=True)
    description_es = models.TextField(blank=True, null=True)
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
    
    description = models.TextField()
    description_en = models.TextField(blank=True, null=True)
    description_es = models.TextField(blank=True, null=True)
    
    date_text = models.CharField(max_length=100, help_text="Ex: 30 DÃ©cembre 2025 â€“ 2 Janvier 2026")
    date_text_en = models.CharField(max_length=100, blank=True, null=True)
    date_text_es = models.CharField(max_length=100, blank=True, null=True)
    
    location = models.CharField(max_length=200)
    location_en = models.CharField(max_length=200, blank=True, null=True)
    location_es = models.CharField(max_length=200, blank=True, null=True)
    
    countdown_day = models.CharField(max_length=10, help_text="Ex: 30")
    countdown_month_year = models.CharField(max_length=100, help_text="Ex: DÃ©cembre 2026")
    countdown_month_year_en = models.CharField(max_length=100, blank=True, null=True)
    countdown_month_year_es = models.CharField(max_length=100, blank=True, null=True)
    image = models.ImageField(upload_to='commemoration/', blank=True, null=True)

    class Meta:
        verbose_name = "Section CommÃ©moration (Accueil)"
        verbose_name_plural = "Section CommÃ©moration (Accueil)"
    def __str__(self):
        return self.title

class HomeCTAAction(models.Model):
    icon_name = models.CharField(max_length=50, help_text="Nom Lucide icon")
    title = models.CharField(max_length=100)
    title_en = models.CharField(max_length=100, blank=True, null=True)
    title_es = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField()
    description_en = models.TextField(blank=True, null=True)
    description_es = models.TextField(blank=True, null=True)
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
    is_overflow = models.BooleanField(default=False, help_text="AffichÃ© dans le menu 'Plus'")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Lien de Navigation"
        verbose_name_plural = "Liens de Navigation"
    def __str__(self):
        return self.label

class MemorialSite(models.Model):
    badge = models.CharField(max_length=100, default="Lieu de mÃ©moire")
    badge_en = models.CharField(max_length=100, blank=True, null=True)
    badge_es = models.CharField(max_length=100, blank=True, null=True)
    
    title = models.CharField(max_length=255, default="Le site mÃ©morial de Makobola")
    title_en = models.CharField(max_length=255, blank=True, null=True)
    title_es = models.CharField(max_length=255, blank=True, null=True)
    
    description = models.TextField()
    description_en = models.TextField(blank=True, null=True)
    description_es = models.TextField(blank=True, null=True)
    
    location = models.CharField(max_length=255, default="Makobola, Territoire de Fizi, Sud-Kivu, RDC")
    location_en = models.CharField(max_length=255, blank=True, null=True)
    location_es = models.CharField(max_length=255, blank=True, null=True)
    
    image = models.ImageField(upload_to='memorial/', blank=True, null=True)

    class Meta:
        verbose_name = "Lieu de Memoire"
        verbose_name_plural = "Lieu de Memoire"

    def save(self, *args, **kwargs):
        if not self.pk and MemorialSite.objects.exists():
            return
        super().save(*args, **kwargs)

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


