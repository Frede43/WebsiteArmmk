from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models.functions import TruncMonth
from .models import *
from .serializers import *

class HeroSlideViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HeroSlide.objects.all()
    serializer_class = HeroSlideSerializer

class ActivityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

class EventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class UpcomingEventViewSet(viewsets.ReadOnlyModelViewSet):
    # Just returning upcoming events
    queryset = Event.objects.all()[:3]
    serializer_class = EventSerializer

class CalendarView(APIView):
    def get(self, request):
        events = Event.objects.all().order_by('date')
        calendar_data = []
        months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
        
        current_month = None
        events_list = []
        
        for event in events:
            month_name = months[event.date.month - 1]
            if current_month != month_name:
                if current_month is not None:
                    calendar_data.append({"month": current_month, "events": events_list})
                current_month = month_name
                events_list = []
                
            events_list.append({
                "day": str(event.date.day),
                "title": event.title,
                "type": event.type
            })
            
        if current_month is not None:
            calendar_data.append({"month": current_month, "events": events_list})
            
        return Response(calendar_data)

class AlbumViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer

class ArticleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

class StoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Story.objects.all()
    serializer_class = StorySerializer

class TeamMemberViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer

class ProgrammeItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProgrammeItem.objects.all()
    serializer_class = ProgrammeItemSerializer

class PastEditionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PastEdition.objects.all()
    serializer_class = PastEditionSerializer

class SupportFormViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SupportForm.objects.all()
    serializer_class = SupportFormSerializer

class PaymentMethodViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PaymentMethod.objects.all()
    serializer_class = PaymentMethodSerializer

class SiteConfigurationView(APIView):
    def get(self, request):
        config = SiteConfiguration.objects.first()
        if config:
            return Response(SiteConfigurationSerializer(config).data)
        return Response({})

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

class DonationIntentViewSet(viewsets.ModelViewSet):
    queryset = DonationIntent.objects.all()
    serializer_class = DonationIntentSerializer

class TestimonySubmissionViewSet(viewsets.ModelViewSet):
    queryset = TestimonySubmission.objects.all()
    serializer_class = TestimonySubmissionSerializer

class ValueViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Value.objects.all()
    serializer_class = ValueSerializer

class DocumentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

class TimelineEventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TimelineEvent.objects.all()
    serializer_class = TimelineEventSerializer

class PartnerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer

class StatisticViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Statistic.objects.all()
    serializer_class = StatisticSerializer

class CommemorationSectionView(APIView):
    def get(self, request):
        section = CommemorationSection.objects.first()
        if section:
            return Response(CommemorationSectionSerializer(section).data)
        return Response({})

class HomeCTAActionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HomeCTAAction.objects.all()
    serializer_class = HomeCTAActionSerializer

class NavLinkViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NavLink.objects.filter(parent=None)
    serializer_class = NavLinkSerializer
