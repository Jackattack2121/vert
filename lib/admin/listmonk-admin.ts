/**
 * Listmonk Admin API Client
 * Handles communication with Listmonk for email marketing management
 */

const LISTMONK_URL = process.env.LISTMONK_URL;
const LISTMONK_USERNAME = process.env.LISTMONK_USERNAME;
const LISTMONK_PASSWORD = process.env.LISTMONK_PASSWORD;

// Validate configuration at module load
if (!LISTMONK_URL || !LISTMONK_USERNAME || !LISTMONK_PASSWORD) {
  console.warn('Listmonk not configured: missing environment variables');
}

// Prevent localhost connections in production
if (LISTMONK_URL && (LISTMONK_URL.includes('localhost') || LISTMONK_URL.includes('127.0.0.1'))) {
  console.warn('Listmonk configured with localhost URL - email features will be unavailable');
}

// Types
export interface ListmonkSubscriber {
  id: number;
  email: string;
  name: string;
  status: 'enabled' | 'disabled' | 'blocklisted';
  lists: number[];
  attribs: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ListmonkList {
  id: number;
  name: string;
  type: 'public' | 'private';
  description: string;
  subscriber_count: number;
  created_at: string;
  updated_at: string;
}

export interface ListmonkCampaign {
  id: number;
  name: string;
  subject: string;
  from_email: string;
  body: string;
  content_type: 'richtext' | 'html' | 'markdown' | 'plain';
  send_at: string | null;
  status: 'draft' | 'scheduled' | 'running' | 'paused' | 'finished' | 'cancelled';
  lists: Array<{ id: number; name: string }>;
  tags: string[];
  started_at: string | null;
  created_at: string;
  updated_at: string;
  views: number;
  clicks: number;
}

export interface ListmonkTemplate {
  id: number;
  name: string;
  type: 'campaign' | 'tx';
  subject: string;
  body: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Check if Listmonk is properly configured
 */
function isListmonkAvailable(): boolean {
  if (!LISTMONK_URL || !LISTMONK_USERNAME || !LISTMONK_PASSWORD) {
    return false;
  }
  
  if (LISTMONK_URL.includes('localhost') || LISTMONK_URL.includes('127.0.0.1')) {
    return false;
  }
  
  return true;
}

/**
 * Get Basic Auth header for Listmonk
 */
function getAuthHeader(): string {
  if (!isListmonkAvailable()) {
    throw new Error('Listmonk is not properly configured');
  }
  return 'Basic ' + Buffer.from(`${LISTMONK_USERNAME!}:${LISTMONK_PASSWORD!}`).toString('base64');
}

/**
 * Make authenticated request to Listmonk API
 */
async function listmonkRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  if (!isListmonkAvailable()) {
    throw new Error('Listmonk is not properly configured');
  }
  
  const url = `${LISTMONK_URL!}/api${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: getAuthHeader(),
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Listmonk API error: ${response.status} - ${error}`);
  }

  return await response.json();
}

// Subscribers API

export async function getSubscribers(params?: {
  page?: number;
  per_page?: number;
  query?: string;
  list_id?: number;
}): Promise<{ data: { results: ListmonkSubscriber[]; total: number } }> {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.append('page', params.page.toString());
  if (params?.per_page) searchParams.append('per_page', params.per_page.toString());
  if (params?.query) searchParams.append('query', params.query);
  if (params?.list_id) searchParams.append('list_id', params.list_id.toString());

  const query = searchParams.toString();
  return await listmonkRequest(`/subscribers${query ? `?${query}` : ''}`);
}

export async function getSubscriberById(id: number): Promise<{ data: ListmonkSubscriber }> {
  return await listmonkRequest(`/subscribers/${id}`);
}

export async function createSubscriber(data: {
  email: string;
  name: string;
  status: 'enabled' | 'disabled' | 'blocklisted';
  lists: number[];
  attribs?: Record<string, any>;
}): Promise<{ data: ListmonkSubscriber }> {
  return await listmonkRequest('/subscribers', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateSubscriber(
  id: number,
  data: Partial<{
    email: string;
    name: string;
    status: 'enabled' | 'disabled' | 'blocklisted';
    lists: number[];
    attribs: Record<string, any>;
  }>
): Promise<{ data: ListmonkSubscriber }> {
  return await listmonkRequest(`/subscribers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteSubscriber(id: number): Promise<void> {
  await listmonkRequest(`/subscribers/${id}`, {
    method: 'DELETE',
  });
}

// Lists API

export async function getLists(): Promise<{ data: { results: ListmonkList[] } }> {
  return await listmonkRequest('/lists');
}

export async function getListById(id: number): Promise<{ data: ListmonkList }> {
  return await listmonkRequest(`/lists/${id}`);
}

// Campaigns API

export async function getCampaigns(params?: {
  page?: number;
  per_page?: number;
  status?: string;
}): Promise<{ data: { results: ListmonkCampaign[]; total: number } }> {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.append('page', params.page.toString());
  if (params?.per_page) searchParams.append('per_page', params.per_page.toString());
  if (params?.status) searchParams.append('status', params.status);

  const query = searchParams.toString();
  return await listmonkRequest(`/campaigns${query ? `?${query}` : ''}`);
}

export async function getCampaignById(id: number): Promise<{ data: ListmonkCampaign }> {
  return await listmonkRequest(`/campaigns/${id}`);
}

export async function createCampaign(data: {
  name: string;
  subject: string;
  lists: number[];
  from_email?: string;
  type?: 'regular' | 'optin';
  content_type?: 'richtext' | 'html' | 'markdown' | 'plain';
  body?: string;
  tags?: string[];
  send_at?: string | null;
  template_id?: number;
}): Promise<{ data: ListmonkCampaign }> {
  return await listmonkRequest('/campaigns', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateCampaign(
  id: number,
  data: Partial<{
    name: string;
    subject: string;
    lists: number[];
    body: string;
    send_at: string | null;
  }>
): Promise<{ data: ListmonkCampaign }> {
  return await listmonkRequest(`/campaigns/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function updateCampaignStatus(
  id: number,
  status: 'scheduled' | 'running' | 'paused' | 'cancelled'
): Promise<{ data: ListmonkCampaign }> {
  return await listmonkRequest(`/campaigns/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}

export async function deleteCampaign(id: number): Promise<void> {
  await listmonkRequest(`/campaigns/${id}`, {
    method: 'DELETE',
  });
}

// Templates API

export async function getTemplates(): Promise<{ data: ListmonkTemplate[] }> {
  return await listmonkRequest('/templates');
}

export async function getTemplateById(id: number): Promise<{ data: ListmonkTemplate }> {
  return await listmonkRequest(`/templates/${id}`);
}

export async function createTemplate(data: {
  name: string;
  type: 'campaign' | 'tx';
  subject?: string;
  body: string;
}): Promise<{ data: ListmonkTemplate }> {
  return await listmonkRequest('/templates', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateTemplate(
  id: number,
  data: Partial<{
    name: string;
    subject: string;
    body: string;
  }>
): Promise<{ data: ListmonkTemplate }> {
  return await listmonkRequest(`/templates/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteTemplate(id: number): Promise<void> {
  await listmonkRequest(`/templates/${id}`, {
    method: 'DELETE',
  });
}

// Dashboard Stats

export async function getDashboardStats(): Promise<{
  data: {
    subscribers: {
      enabled: number;
      disabled: number;
      blocklisted: number;
    };
    campaigns: {
      draft: number;
      scheduled: number;
      running: number;
      finished: number;
    };
    lists: number;
  };
}> {
  return await listmonkRequest('/dashboard/stats');
}

