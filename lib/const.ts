// Sample weekly data - this will come from API later
export const weeklyData = [
  { day: "Mo", date: "", icon: "completed", isActive: false },
  { day: "Tu", date: "", icon: "completed", isActive: false },
  { day: "We", date: "", icon: "pending", isActive: true },
  { day: "Th", date: "", icon: "completed", isActive: false },
  { day: "Fr", date: "", icon: "empty", isActive: false },
  { day: "Sa", date: "", icon: "empty", isActive: false },
  { day: "Su", date: "", icon: "empty", isActive: false },
];

// Sample learning paths data
export const learningPaths = [
  {
    id: 1,
    title: "Intro to Melo",
    description: "Get started with your personal growth journey",
    progress: 100,
    isLocked: false,
    color: "#DF97ED",
    lessons: 5,
    completedLessons: 5,
  },
  {
    id: 2,
    title: "Self-Esteem",
    description: "Build confidence and positive self-image",
    progress: 60,
    isLocked: false,
    color: "#4ECDC4",
    lessons: 8,
    completedLessons: 5,
  },
  {
    id: 3,
    title: "Stress Management",
    description: "Learn techniques to manage daily stress",
    progress: 25,
    isLocked: false,
    color: "#45B7D1",
    lessons: 10,
    completedLessons: 3,
  },
  {
    id: 4,
    title: "Mindfulness",
    description: "Develop present-moment awareness",
    progress: 0,
    isLocked: true,
    color: "#96CEB4",
    lessons: 12,
    completedLessons: 0,
  },
  {
    id: 5,
    title: "Emotional Intelligence",
    description: "Understand and manage your emotions",
    progress: 0,
    isLocked: true,
    color: "#FFEAA7",
    lessons: 15,
    completedLessons: 0,
  },
  {
    id: 6,
    title: "Relationships",
    description: "Build healthier connections with others",
    progress: 0,
    isLocked: true,
    color: "#FD79A8",
    lessons: 9,
    completedLessons: 0,
  },
];

// Sample data that will later come from API
export const communityStats = {
  members: "2.4k",
  online: "156",
  postsToday: "89",
};

export const samplePosts = [
  {
    id: 1,
    user: "Sarah M.",
    timeAgo: "2h ago",
    content:
      "Just completed my first week of therapy sessions! Feeling more hopeful than I have in months. Thank you to everyone who shared their experiences. 💜",
    likes: 21,
    comments: 21,
    hasSuccessTag: true,
  },
  {
    id: 2,
    user: "Sarah M.",
    timeAgo: "2h ago",
    content:
      "Just completed my first week of therapy sessions! Feeling more hopeful than I have in months. Thank you to everyone who shared their experiences. 💜",
    likes: 21,
    comments: 21,
    hasSuccessTag: true,
  },
  {
    id: 3,
    user: "Sarah M.",
    timeAgo: "2h ago",
    content:
      "Just completed my first week of therapy sessions! Feeling more hopeful than I have in months. Thank you to everyone who shared their experiences. 💜",
    likes: 21,
    comments: 21,
    hasSuccessTag: true,
  },
  {
    id: 4,
    user: "Sarah M.",
    timeAgo: "2h ago",
    content:
      "Just completed my first week of therapy sessions! Feeling more hopeful than I have in months. Thank you to everyone who shared their experiences. 💜",
    likes: 21,
    comments: 21,
    hasSuccessTag: true,
  },
];
