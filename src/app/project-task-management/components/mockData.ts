export type TaskStatus = 'backlog' | 'todo' | 'in-progress' | 'in-review' | 'done' | 'blocked';
export type Priority = 'critical' | 'high' | 'medium' | 'low';
export type ProjectStatus = 'planning' | 'active' | 'on-hold' | 'completed' | 'archived';

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  color: string;
  role: 'admin' | 'member';
  email: string;
}

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  description: string;
  taskCount: number;
  completedCount: number;
  memberCount: number;
  dueDate: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  projectId: string;
  projectName: string;
  assigneeId: string;
  assigneeName: string;
  assigneeInitials: string;
  assigneeColor: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: string;
  createdDate: string;
  labels: string[];
  description: string;
  isOverdue: boolean;
  commentCount: number;
}

export const teamMembers: TeamMember[] = [
  { id: 'user-001', name: 'Rohan Lal', initials: 'RL', color: 'from-violet-600 to-cyan-600', role: 'admin', email: 'rohan.lal@acme-eng.io' },
  { id: 'user-002', name: 'Priya Sharma', initials: 'PS', color: 'from-red-600 to-orange-600', role: 'member', email: 'priya.sharma@acme-eng.io' },
  { id: 'user-003', name: 'Arjun Mehta', initials: 'AM', color: 'from-green-600 to-emerald-600', role: 'member', email: 'arjun.mehta@acme-eng.io' },
  { id: 'user-004', name: 'Tanvi Rao', initials: 'TR', color: 'from-violet-600 to-purple-600', role: 'member', email: 'tanvi.rao@acme-eng.io' },
  { id: 'user-005', name: 'Kiran Desai', initials: 'KD', color: 'from-cyan-600 to-blue-600', role: 'member', email: 'kiran.desai@acme-eng.io' },
  { id: 'user-006', name: 'Sneha Iyer', initials: 'SI', color: 'from-pink-600 to-rose-600', role: 'member', email: 'sneha.iyer@acme-eng.io' },
];

export const projects: Project[] = [
  { id: 'proj-001', name: 'API Gateway v3', status: 'active', description: 'REST + GraphQL gateway with rate limiting and auth middleware', taskCount: 25, completedCount: 12, memberCount: 4, dueDate: 'May 15, 2026', color: 'bg-violet-500' },
  { id: 'proj-002', name: 'Auth Service', status: 'active', description: 'OAuth 2.0 + JWT token service with RBAC', taskCount: 20, completedCount: 8, memberCount: 3, dueDate: 'May 22, 2026', color: 'bg-red-500' },
  { id: 'proj-003', name: 'Dashboard UI', status: 'active', description: 'React component library and admin dashboard', taskCount: 27, completedCount: 15, memberCount: 5, dueDate: 'May 30, 2026', color: 'bg-cyan-500' },
  { id: 'proj-004', name: 'Data Pipeline', status: 'active', description: 'Kafka-based event streaming and ETL pipeline', taskCount: 15, completedCount: 7, memberCount: 3, dueDate: 'Jun 5, 2026', color: 'bg-amber-500' },
  { id: 'proj-005', name: 'Mobile App', status: 'active', description: 'React Native iOS/Android companion app', taskCount: 22, completedCount: 9, memberCount: 4, dueDate: 'Jun 12, 2026', color: 'bg-pink-500' },
  { id: 'proj-006', name: 'Infra Upgrade', status: 'on-hold', description: 'Terraform migration to multi-region AWS setup', taskCount: 9, completedCount: 4, memberCount: 2, dueDate: 'Jun 20, 2026', color: 'bg-zinc-500' },
];

export const tasks: Task[] = [
  { id: 'task-001', title: 'Fix memory leak in WebSocket handler', projectId: 'proj-001', projectName: 'API Gateway v3', assigneeId: 'user-001', assigneeName: 'Rohan Lal', assigneeInitials: 'RL', assigneeColor: 'from-violet-600 to-cyan-600', status: 'in-progress', priority: 'critical', dueDate: 'May 2, 2026', createdDate: 'Apr 28, 2026', labels: ['bug', 'backend'], description: 'Memory usage spikes under heavy WebSocket load. Profile and fix the leak in the connection pool.', isOverdue: true, commentCount: 4 },
  { id: 'task-002', title: 'Add rate limiting middleware', projectId: 'proj-001', projectName: 'API Gateway v3', assigneeId: 'user-003', assigneeName: 'Arjun Mehta', assigneeInitials: 'AM', assigneeColor: 'from-green-600 to-emerald-600', status: 'done', priority: 'high', dueDate: 'Apr 30, 2026', createdDate: 'Apr 20, 2026', labels: ['backend', 'security'], description: 'Implement token bucket rate limiting per API key.', isOverdue: false, commentCount: 2 },
  { id: 'task-003', title: 'OAuth token refresh loop', projectId: 'proj-002', projectName: 'Auth Service', assigneeId: 'user-002', assigneeName: 'Priya Sharma', assigneeInitials: 'PS', assigneeColor: 'from-red-600 to-orange-600', status: 'blocked', priority: 'critical', dueDate: 'May 1, 2026', createdDate: 'Apr 25, 2026', labels: ['bug', 'auth'], description: 'Refresh token is being called in a loop when access token expires. Blocking downstream services.', isOverdue: true, commentCount: 7 },
  { id: 'task-004', title: 'Dark mode design tokens', projectId: 'proj-003', projectName: 'Dashboard UI', assigneeId: 'user-004', assigneeName: 'Tanvi Rao', assigneeInitials: 'TR', assigneeColor: 'from-violet-600 to-purple-600', status: 'in-review', priority: 'medium', dueDate: 'May 3, 2026', createdDate: 'Apr 26, 2026', labels: ['design', 'frontend'], description: 'Migrate all hardcoded color values to CSS custom properties for dark mode support.', isOverdue: false, commentCount: 3 },
  { id: 'task-005', title: 'Kafka dead-letter queue handler', projectId: 'proj-004', projectName: 'Data Pipeline', assigneeId: 'user-001', assigneeName: 'Rohan Lal', assigneeInitials: 'RL', assigneeColor: 'from-violet-600 to-cyan-600', status: 'todo', priority: 'high', dueDate: 'May 6, 2026', createdDate: 'Apr 29, 2026', labels: ['backend', 'infra'], description: 'Implement DLQ handler to capture and retry failed Kafka messages.', isOverdue: false, commentCount: 1 },
  { id: 'task-006', title: 'Push notification setup', projectId: 'proj-005', projectName: 'Mobile App', assigneeId: 'user-006', assigneeName: 'Sneha Iyer', assigneeInitials: 'SI', assigneeColor: 'from-pink-600 to-rose-600', status: 'done', priority: 'medium', dueDate: 'Apr 29, 2026', createdDate: 'Apr 18, 2026', labels: ['mobile', 'feature'], description: 'Integrate Firebase Cloud Messaging for iOS and Android push notifications.', isOverdue: false, commentCount: 5 },
  { id: 'task-007', title: 'SSL cert auto-renewal', projectId: 'proj-006', projectName: 'Infra Upgrade', assigneeId: 'user-003', assigneeName: 'Arjun Mehta', assigneeInitials: 'AM', assigneeColor: 'from-green-600 to-emerald-600', status: 'in-progress', priority: 'high', dueDate: 'May 4, 2026', createdDate: 'Apr 27, 2026', labels: ['infra', 'security'], description: 'Set up cert-manager in Kubernetes for automatic SSL certificate renewal.', isOverdue: false, commentCount: 0 },
  { id: 'task-008', title: 'Write unit tests for auth middleware', projectId: 'proj-002', projectName: 'Auth Service', assigneeId: 'user-001', assigneeName: 'Rohan Lal', assigneeInitials: 'RL', assigneeColor: 'from-violet-600 to-cyan-600', status: 'todo', priority: 'high', dueDate: 'May 3, 2026', createdDate: 'Apr 28, 2026', labels: ['testing', 'backend'], description: 'Achieve 85% test coverage on the auth middleware layer.', isOverdue: false, commentCount: 0 },
  { id: 'task-009', title: 'Implement pagination on /tasks endpoint', projectId: 'proj-001', projectName: 'API Gateway v3', assigneeId: 'user-005', assigneeName: 'Kiran Desai', assigneeInitials: 'KD', assigneeColor: 'from-cyan-600 to-blue-600', status: 'in-review', priority: 'medium', dueDate: 'May 2, 2026', createdDate: 'Apr 24, 2026', labels: ['backend', 'api'], description: 'Add cursor-based pagination to the /tasks list endpoint for better performance.', isOverdue: true, commentCount: 2 },
  { id: 'task-010', title: 'Onboarding flow — step 3 form validation', projectId: 'proj-003', projectName: 'Dashboard UI', assigneeId: 'user-004', assigneeName: 'Tanvi Rao', assigneeInitials: 'TR', assigneeColor: 'from-violet-600 to-purple-600', status: 'in-progress', priority: 'medium', dueDate: 'May 5, 2026', createdDate: 'Apr 28, 2026', labels: ['frontend', 'feature'], description: 'Add react-hook-form validation to the workspace setup step in onboarding.', isOverdue: false, commentCount: 1 },
  { id: 'task-011', title: 'Update Terraform modules for us-west-2', projectId: 'proj-006', projectName: 'Infra Upgrade', assigneeId: 'user-001', assigneeName: 'Rohan Lal', assigneeInitials: 'RL', assigneeColor: 'from-violet-600 to-cyan-600', status: 'blocked', priority: 'high', dueDate: 'May 4, 2026', createdDate: 'Apr 26, 2026', labels: ['infra'], description: 'Waiting on AWS account provisioning for the new region.', isOverdue: false, commentCount: 3 },
  { id: 'task-012', title: 'Offline mode for task editing', projectId: 'proj-005', projectName: 'Mobile App', assigneeId: 'user-006', assigneeName: 'Sneha Iyer', assigneeInitials: 'SI', assigneeColor: 'from-pink-600 to-rose-600', status: 'backlog', priority: 'low', dueDate: 'Jun 1, 2026', createdDate: 'Apr 30, 2026', labels: ['mobile', 'feature'], description: 'Allow users to edit tasks offline with sync on reconnect.', isOverdue: false, commentCount: 0 },
];