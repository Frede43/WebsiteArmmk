from django.db import models

class HeroSlide(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.TextField()
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
    short_desc = models.CharField(max_length=255, help_text="Description courte")
    description = models.TextField()
    icon = models.CharField(max_length=50, help_text="Nom de l'icône Lucide (ex: MessageCircle)")
    color = models.CharField(max_length=20, help_text="Code couleur hex (ex: #002D62)")
    tag = models.CharField(max_length=50)
    next_event = models.CharField(max_length=150, blank=True, null=True, help_text="Texte libre indiquant la date du prochain événement")
    location = models.CharField(max_length=200)
    participants = models.PositiveIntegerField(default=0)
    image = models.ImageField(upload_to='activities/', blank=True, null=True)
    achievements = models.JSONField(default=list, help_text="Liste des réalisations (format JSON)") 

    class Meta:
        verbose_name = "Activité"
        verbose_name_plural = "Activités"

    def __str__(self):
        return self.title

class Event(models.Model):
    EVENT_TYPES = (
        ('dialogue', 'Dialogue'),
        ('formation', 'Formation'),
        ('soutien', 'Soutien'),
        ('commemoration', 'Commémoration'),
        ('gouvernance', 'Gouvernance'),
    )
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    type = models.CharField(max_length=50, choices=EVENT_TYPES)
    date = models.DateField()
    time = models.CharField(max_length=100, blank=True, null=True, help_text="Texte libre pour l'horaire")
    location = models.CharField(max_length=200)
    activity = models.ForeignKey(Activity, on_delete=models.SET_NULL, null=True, blank=True, related_name='events')

    class Meta:
        ordering = ['date']
        verbose_name = "Événement"
        verbose_name_plural = "Événements"

    def __str__(self):
        return f"{self.title} - {self.date.strftime('%d/%m/%Y')}"

class Album(models.Model):
    title = models.CharField(max_length=200)
    year = models.IntegerField(help_text="Année de l'album")
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

class Article(models.Model):
    slug = models.SlugField(unique=True)
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=100, help_text="Catégorie affichée (ex: Mémoire)")
    tag = models.CharField(max_length=50, help_text="Sert uniquement aux couleurs, ex: commemoration, formation")
    date = models.DateField()
    excerpt = models.TextField(help_text="Extrait visible sur la carte")
    content = models.TextField(help_text="Contenu complet de l'article")
    image = models.ImageField(upload_to='articles/', blank=True, null=True)

    class Meta:
        ordering = ['-date']
        verbose_name = "Article / Actualité"
        verbose_name_plural = "Articles / Actualités"

    def __str__(self):
        return self.title

class Story(models.Model):
    name = models.CharField(max_length=150, help_text="Nom du témoin")
    age = models.CharField(max_length=10, blank=True)
    role = models.CharField(max_length=100, blank=True)
    image = models.ImageField(upload_to='stories/', blank=True, null=True)
    teaser = models.CharField(max_length=255, help_text="Citation courte d'accroche")
    excerpt = models.TextField(help_text="Extrait pour la carte")
    full_text = models.TextField(help_text="Témoignage complet")

    class Meta:
        verbose_name = "Témoignage"
        verbose_name_plural = "Témoignages"

    def __str__(self):
        return f"Témoignage de {self.name}"

class TeamMember(models.Model):
    name = models.CharField(max_length=150)
    initials = models.CharField(max_length=10)
    role = models.CharField(max_length=200)
    image = models.ImageField(upload_to='team/', blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Membre de l'équipe"
        verbose_name_plural = "Membres de l'équipe"

    def __str__(self):
        return self.name

class ProgrammeItem(models.Model):
    time = models.CharField(max_length=100, help_text="Horaire direct (ex: 10h00 - 12h00)")
    event = models.CharField(max_length=255, help_text="Titre de la session")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Point du Programme"
        verbose_name_plural = "Programme des commémorations"

class PastEdition(models.Model):
    year = models.CharField(max_length=4)
    count = models.PositiveIntegerField(help_text="Nombre de participants")
    highlight = models.TextField(help_text="Fait marquant de l'édition")

    class Meta:
        ordering = ['-year']
        verbose_name = "Édition passée"
        verbose_name_plural = "Éditions passées"

class SupportForm(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    icon_name = models.CharField(max_length=50, help_text="Nom lucide-react (ex: HandHeart)")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Forme de Soutien"
        verbose_name_plural = "Formes de Soutien"

class PaymentMethod(models.Model):
    label = models.CharField(max_length=100)
    detail = models.CharField(max_length=200)
    icon_name = models.CharField(max_length=50)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Méthode de paiement"
        verbose_name_plural = "Méthodes de paiement"

class SiteConfiguration(models.Model):
    site_name = models.CharField(max_length=100, default="ARMMK")
    site_logo = models.ImageField(upload_to='settings/', blank=True, null=True)
    about_text = models.TextField(blank=True, help_text="Texte d'à propos global (footer/home)")
    
    # Page À Propos
    about_history_title = models.CharField(max_length=255, blank=True, default="Née de la douleur, portée par la dignité")
    about_history_content = models.TextField(blank=True)
    about_history_image = models.ImageField(upload_to='about/', blank=True, null=True)
    
    mission_text = models.TextField(blank=True)
    vision_text = models.TextField(blank=True)

    # Page Massacre
    massacre_intro_title = models.CharField(max_length=255, blank=True, default="Un crime contre l'humanité en plein cœur du Congo")
    massacre_intro_content = models.TextField(blank=True)
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

    def save(self, *args, **kwargs):
        if not self.pk and SiteConfiguration.objects.exists():
            return
        super().save(*args, **kwargs)

    def __str__(self):
        return "Paramètres Généraux du Site"

class ContactMessage(models.Model):
    first_name = models.CharField(max_length=100, verbose_name="Prénom")
    last_name = models.CharField(max_length=100, blank=True, verbose_name="Nom")
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True, verbose_name="Sujet")
    message = models.TextField()
    is_read = models.BooleanField(default=False, verbose_name="Lu ?")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Message de Contact"
        verbose_name_plural = "Messages de Contact"

    def __str__(self):
        return f"Message de {self.first_name} ({self.created_at.strftime('%d/%m/%Y')})"

class DonationIntent(models.Model):
    first_name = models.CharField(max_length=100, verbose_name="Prénom et nom")
    email = models.EmailField()
    amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, verbose_name="Montant ($)")
    is_monthly = models.BooleanField(default=False, verbose_name="Don Mensuel ?")
    status = models.CharField(max_length=50, default='pending', choices=(
        ('pending', 'En attente'),
        ('contacted', 'Contacté / En cours'),
        ('completed', 'Finalisé'),
    ), verbose_name="Statut")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Promesse de Don"
        verbose_name_plural = "Promesses de Don"

    def __str__(self):
        return f"Promesse de {self.amount}$ par {self.first_name}"

class TestimonySubmission(models.Model):
    name = models.CharField(max_length=200, verbose_name="Nom et Prénom")
    contact_info = models.CharField(max_length=200, blank=True, verbose_name="Contact")
    relation = models.CharField(max_length=100, verbose_name="Lien avec le massacre")
    message = models.TextField(verbose_name="Témoignage")
    is_reviewed = models.BooleanField(default=False, verbose_name="Validé ?")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Soumission de Témoignage"
        verbose_name_plural = "Soumissions de Témoignages"

    def __str__(self):
        return f"Témoignage reçu de {self.name}"

class Value(models.Model):
    label = models.CharField(max_length=100)
    desc = models.TextField()
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
        ('communiques', 'Communiqués'),
        ('archives', 'Archives historiques'),
        ('ressources', 'Ressources pédagogiques'),
    ]
    FORMAT_CHOICES = [('PDF', 'PDF'), ('DOC', 'DOC'), ('XLSX', 'XLSX')]
    LANGUAGE_CHOICES = [('FR', 'Français'), ('EN', 'English'), ('SW', 'Swahili')]

    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
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
    date = models.CharField(max_length=50, help_text="Ex: 30 DÉC. 1998")
    title = models.CharField(max_length=255)
    text = models.TextField()
    order = models.PositiveIntegerField(default=0)
    class Meta:
        ordering = ['order']
        verbose_name = "Evènement Chronologique"
        verbose_name_plural = "Frise Chronologique (Massacre)"
    def __str__(self):
        return self.title

class Partner(models.Model):
    name = models.CharField(max_length=200)
    type = models.CharField(max_length=100, help_text="Ex: ONG Internationale")
    country = models.CharField(max_length=100)
    description = models.TextField()
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
    value = models.CharField(max_length=50) 
    sub = models.CharField(max_length=100, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Statistique"
        verbose_name_plural = "Statistiques"
    def __str__(self):
        return f"{self.value} {self.label}"

class CommemorationSection(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    date_text = models.CharField(max_length=100, help_text="Ex: 30 Décembre 2025 – 2 Janvier 2026")
    location = models.CharField(max_length=200)
    countdown_day = models.CharField(max_length=10, help_text="Ex: 30")
    countdown_month_year = models.CharField(max_length=100, help_text="Ex: Décembre 2026")
    image = models.ImageField(upload_to='commemoration/', blank=True, null=True)

    class Meta:
        verbose_name = "Section Commémoration (Accueil)"
        verbose_name_plural = "Section Commémoration (Accueil)"
    def __str__(self):
        return self.title

class HomeCTAAction(models.Model):
    icon_name = models.CharField(max_length=50, help_text="Nom Lucide icon")
    title = models.CharField(max_length=100)
    description = models.TextField()
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
    href = models.CharField(max_length=255)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
    description = models.CharField(max_length=255, blank=True)
    is_overflow = models.BooleanField(default=False, help_text="Affiché dans le menu 'Plus'")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = "Lien de Navigation"
        verbose_name_plural = "Liens de Navigation"
    def __str__(self):
        return self.label
