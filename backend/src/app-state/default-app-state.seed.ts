import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

type SeedDefinition = {
  key: string;
  file: string;
  select: (module: Record<string, any>) => unknown;
};

const SEED_DEFINITIONS: SeedDefinition[] = [
  { key: 'users', file: 'user.js', select: (module) => module.users ?? [] },
  { key: 'tours', file: 'tour.js', select: (module) => module.tour ?? [] },
  { key: 'reviews', file: 'review.js', select: (module) => module.reviews ?? [] },
  { key: 'experienceHome', file: 'experience_home.js', select: (module) => module.homeData ?? [] },
  { key: 'homeTestimonials', file: 'experience_home.js', select: (module) => module.homeTestimonials ?? [] },
  { key: 'experienceEarnings', file: 'experience_earningsData.js', select: (module) => module.earningsData ?? [] },
  { key: 'experienceBookings', file: 'experience_bookings.js', select: (module) => module.bookingsData ?? [] },
  { key: 'experienceCatalog', file: 'experience_experience_data.js', select: (module) => module.experiences ?? [] },
  { key: 'experienceProfile', file: 'experience_profile.js', select: (module) => module.profileData ?? {} },
  { key: 'hotelBookings', file: 'hotelBookings.js', select: (module) => module.hotelBookings ?? [] },
  { key: 'hotelReviews', file: 'hotelReviews.js', select: (module) => module.hotelReviews ?? [] },
  { key: 'hotelActivity', file: 'hotelActivity.js', select: (module) => module.hotelActivity ?? [] },
  { key: 'hotelServices', file: 'hotelServices.js', select: (module) => module.hotelServices ?? [] },
  { key: 'scheduleData', file: 'schedule.js', select: (module) => module.initialScheduleData ?? [] },
  { key: 'profileData', file: 'profile-data.js', select: (module) => module.initialProfileData ?? {} },
  { key: 'supportData', file: 'support-data.js', select: (module) => module.initialSupportData ?? {} },
  { key: 'techAdminData', file: 'tech_admin_data.js', select: (module) => module.techAdminData ?? {} },
  { key: 'travelerWorkspaceSeed', file: 'travelerWorkspaceData.js', select: (module) => module.travelerWorkspaceSeed ?? {} },
  { key: 'traveler_workspace_plans', file: 'travelerWorkspaceData.js', select: (module) => module.travelerWorkspaceSeed?.plans ?? [] },
  { key: 'traveler_workspace_profile', file: 'travelerWorkspaceData.js', select: (module) => module.travelerWorkspaceSeed?.profile ?? {} },
  { key: 'travelerData', file: 'traveler.js', select: (module) => module.travelerData ?? {} },
  { key: 'ntaPlans', file: 'nontechadmin_data.js', select: (module) => module.nontechAdminData?.plans ?? [] },
  { key: 'ntaActivity', file: 'nontechadmin_data.js', select: (module) => module.nontechAdminData?.recentActivity ?? [] },
  { key: 'partnerPerformanceData', file: 'partners.js', select: (module) => module.partners ?? [] },
  { key: 'opsData', file: 'usersData.js', select: (module) => module.opsData ?? [] },
  { key: 'platformUsers', file: 'usersData.js', select: (module) => module.initialUsersData ?? [] },
  { key: 'partners', file: 'usersData.js', select: (module) => module.initialPartnersData ?? [] },
  { key: 'flightsData', file: 'flights.js', select: (module) => module.flightsData ?? {} },
  { key: 'financeChartData', file: 'financeData.js', select: (module) => module.chartData ?? {} },
  { key: 'financeStats', file: 'financeData.js', select: (module) => module.financeStats ?? [] },
  { key: 'financePayoutData', file: 'financeData.js', select: (module) => module.payoutData ?? [] },
];

const INLINE_DEFAULT_STATE: Record<string, unknown> = {
  refunds: [
    {
      queueId: '98305',
      status: 'FULLY REFUNDED',
      statusClass: 'badge-refunded',
      title: 'Sahara Desert Overnight Trek',
      reason: 'Flight<br>Cancellation',
      impact: '-₹1.2L',
      impactClass: 'text-red',
      resolutionId: '552190',
    },
  ],
  ledger: [
    {
      id: '98421',
      traveler: 'Elena Moretti',
      initials: 'EM',
      tier: 'Premium Member',
      avatarColor: 'avatar-light-blue',
      service: 'Venice Gondola Private Tour',
      serviceTier: 'Luxe Tier',
      date: 'Oct 24, 2024',
      guide: 'Marco Polo',
      guideInitials: 'MP',
      status: 'CONFIRMED',
      statusClass: 'status-confirmed',
    },
    {
      id: '98420',
      traveler: 'James Smith',
      initials: 'JS',
      tier: 'Corporate',
      avatarColor: 'avatar-light-blue',
      service: 'Kyoto Temple Hike',
      serviceTier: 'Full Day',
      date: 'Oct 24, 2024',
      guide: 'Yuki Tanaka',
      guideInitials: 'YT',
      status: 'ONGOING',
      statusClass: 'status-ongoing',
    },
  ],
  disputes: [
    {
      caseId: '4412',
      bookingRef: '97001',
      issueMain: 'Partner No-Show Claim',
      issueSub: 'Traveler documentation<br>provided via website',
      severityClass: 'severity-critical',
      severityText: 'CRITICAL',
      dotClass: 'dot-red',
      flowStatus: 'Open Inquiry',
    },
    {
      caseId: '4410',
      bookingRef: '97055',
      issueMain: 'Vehicle Logistics Quality',
      issueSub: 'Reported AC failure<br>during desert excursion',
      severityClass: 'severity-standard',
      severityText: 'STANDARD',
      dotClass: 'dot-yellow',
      flowStatus: 'Gathering Evidence',
    },
  ],
};

async function importSeedModule(file: string) {
  const absolutePath = join(
    process.cwd(),
    'src',
    'app-state',
    'seed-data',
    file,
  );

  return import(pathToFileURL(absolutePath).href);
}

export async function loadDefaultAppState() {
  const cache = new Map<string, Record<string, any>>();
  const state: Record<string, unknown> = {};

  for (const definition of SEED_DEFINITIONS) {
    const cachedModule = cache.get(definition.file);
    const resolvedModule =
      cachedModule ?? (await importSeedModule(definition.file));

    if (!cachedModule) {
      cache.set(definition.file, resolvedModule);
    }

    state[definition.key] = definition.select(resolvedModule);
  }

  for (const [key, value] of Object.entries(INLINE_DEFAULT_STATE)) {
    state[key] = value;
  }

  return state;
}
