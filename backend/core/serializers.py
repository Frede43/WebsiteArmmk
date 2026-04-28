from rest_framework import serializers
from .models import *

class HeroSlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSlide
        fields = '__all__'

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    date = serializers.SerializerMethodField()
    time = serializers.CharField(source='time_str', required=False) # Wait, my model has 'time' and 'date'. 

    class Meta:
        model = Event
        fields = [
            'id', 'title', 'title_en', 'title_es', 
            'type', 'description', 'description_en', 'description_es', 
            'time', 'time_en', 'time_es', 
            'location', 'location_en', 'location_es', 'date'
        ]

    def get_date(self, obj):
        months = ["Jan.", "Fév.", "Mars", "Avr.", "Mai", "Juin", "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc."]
        return {
            "day": str(obj.date.day),
            "month": months[obj.date.month - 1],
            "year": str(obj.date.year)
        }

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['src', 'alt']

class AlbumSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(many=True, read_only=True)

    class Meta:
        model = Album
        fields = ['title', 'title_en', 'title_es', 'year', 'photos']

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'

class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = '__all__'

class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = '__all__'

class ProgrammeItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgrammeItem
        fields = '__all__'

class PastEditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PastEdition
        fields = '__all__'

class SupportFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupportForm
        fields = '__all__'

class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = '__all__'

class SiteConfigurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteConfiguration
        fields = '__all__'

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'

class DonationIntentSerializer(serializers.ModelSerializer):
    class Meta:
        model = DonationIntent
        fields = '__all__'

class TestimonySubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestimonySubmission
        fields = '__all__'

class ValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Value
        fields = '__all__'

class DocumentSerializer(serializers.ModelSerializer):
    downloadUrl = serializers.SerializerMethodField()

    class Meta:
        model = Document
        fields = '__all__'

    def get_downloadUrl(self, obj):
        if obj.downloadUrl:
            return obj.downloadUrl
        if obj.file:
            return obj.file.url
        return "#"

class TimelineEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimelineEvent
        fields = '__all__'

class PartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        fields = '__all__'

class StatisticSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statistic
        fields = '__all__'

class CommemorationSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommemorationSection
        fields = '__all__'

class HomeCTAActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeCTAAction
        fields = '__all__'

class NavLinkSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = NavLink
        fields = [
            'id', 'label', 'label_en', 'label_es', 
            'href', 'description', 'description_en', 'description_es', 
            'is_overflow', 'children'
        ]

    def get_children(self, obj):
        if obj.children.exists():
            return NavLinkSerializer(obj.children.all(), many=True).data
        return None
