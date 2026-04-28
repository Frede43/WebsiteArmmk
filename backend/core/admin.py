from django.contrib import admin
from .models import *

@admin.register(HeroSlide)
class HeroSlideAdmin(admin.ModelAdmin):
    list_display = ('title', 'order')

@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('title', 'tag', 'participants')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'type', 'date', 'location')
    list_filter = ('type', 'date')

class PhotoInline(admin.TabularInline):
    model = Photo
    extra = 1

@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    list_display = ('title', 'year', 'order')
    inlines = [PhotoInline]

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'date')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(Story)
class StoryAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'order')

@admin.register(ProgrammeItem)
class ProgrammeItemAdmin(admin.ModelAdmin):
    list_display = ('event', 'time', 'order')

@admin.register(PastEdition)
class PastEditionAdmin(admin.ModelAdmin):
    list_display = ('year', 'count')

@admin.register(SupportForm)
class SupportFormAdmin(admin.ModelAdmin):
    list_display = ('title', 'order')

@admin.register(PaymentMethod)
class PaymentMethodAdmin(admin.ModelAdmin):
    list_display = ('label', 'order')

@admin.register(SiteConfiguration)
class SiteConfigurationAdmin(admin.ModelAdmin):
    list_display = ('site_name', 'contact_email')

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'email', 'created_at', 'is_read')
    list_filter = ('is_read', 'created_at')

@admin.register(DonationIntent)
class DonationIntentAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'amount', 'is_monthly', 'status', 'created_at')
    list_filter = ('status', 'is_monthly')

@admin.register(TestimonySubmission)
class TestimonySubmissionAdmin(admin.ModelAdmin):
    list_display = ('name', 'relation', 'created_at', 'is_reviewed')
    list_filter = ('is_reviewed', 'created_at')

@admin.register(Value)
class ValueAdmin(admin.ModelAdmin):
    list_display = ('label', 'order')

@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'format', 'date', 'featured', 'order')
    list_filter = ('category', 'format', 'featured')

@admin.register(TimelineEvent)
class TimelineEventAdmin(admin.ModelAdmin):
    list_display = ('date', 'title', 'order')

@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'country', 'order')

@admin.register(Statistic)
class StatisticAdmin(admin.ModelAdmin):
    list_display = ('label', 'value', 'order')

@admin.register(CommemorationSection)
class CommemorationSectionAdmin(admin.ModelAdmin):
    list_display = ('title', 'date_text')

@admin.register(HomeCTAAction)
class HomeCTAActionAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_primary', 'order')

@admin.register(NavLink)
class NavLinkAdmin(admin.ModelAdmin):
    list_display = ('label', 'href', 'parent', 'is_overflow', 'order')
    list_filter = ('parent', 'is_overflow')
