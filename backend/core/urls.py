from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'hero-slides', HeroSlideViewSet, basename='heroslides')
router.register(r'activities', ActivityViewSet, basename='activities')
router.register(r'events', EventViewSet, basename='events')
router.register(r'upcoming-events', UpcomingEventViewSet, basename='upcomingevents')
router.register(r'albums', AlbumViewSet, basename='albums')
router.register(r'articles', ArticleViewSet, basename='articles')
router.register(r'stories', StoryViewSet, basename='stories')
router.register(r'team', TeamMemberViewSet, basename='team')
router.register(r'programme', ProgrammeItemViewSet, basename='programme')
router.register(r'past-editions', PastEditionViewSet, basename='pasteditions')
router.register(r'supports', SupportFormViewSet, basename='supports')
router.register(r'payment-methods', PaymentMethodViewSet, basename='paymentmethods')
router.register(r'contact', ContactMessageViewSet, basename='contact')
router.register(r'donation', DonationIntentViewSet, basename='donation')
router.register(r'submissions', TestimonySubmissionViewSet, basename='submissions')
router.register(r'values', ValueViewSet, basename='values')
router.register(r'documents', DocumentViewSet, basename='documents')
router.register(r'timeline', TimelineEventViewSet, basename='timeline')
router.register(r'partners', PartnerViewSet, basename='partners')
router.register(r'stats', StatisticViewSet, basename='stats')
router.register(r'cta-actions', HomeCTAActionViewSet, basename='ctaactions')
router.register(r'nav-links', NavLinkViewSet, basename='navlinks')

urlpatterns = [
    path('', include(router.urls)),
    path('calendar/', CalendarView.as_view(), name='calendar'),
    path('config/', SiteConfigurationView.as_view(), name='config'),
    path('commemoration-section/', CommemorationSectionView.as_view(), name='commemoration-section'),
]
