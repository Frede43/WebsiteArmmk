from core.models import HomeCTAAction

HomeCTAAction.objects.all().delete()

HomeCTAAction.objects.create(
    title="Faire un don",
    description="Soutenez nos actions sur le terrain pour préserver la mémoire et aider les rescapés.",
    icon_name="HeartHandshake",
    href="/soutenir",
    is_primary=True,
    order=1
)

HomeCTAAction.objects.create(
    title="Témoigner",
    description="Partagez votre histoire. Votre voix est essentielle pour l'histoire et pour les générations futures.",
    icon_name="MessageCircleHeart",
    href="/contact",
    is_primary=False,
    order=2
)

HomeCTAAction.objects.create(
    title="Devenir Partenaire",
    description="Rejoignez notre réseau de partenaires pour nous aider dans nos différentes missions.",
    icon_name="Handshake",
    href="/partenaires",
    is_primary=False,
    order=3
)

print('Donnees CTA inserees avec succes.')
