export interface PromptsGetResponse {
    count: number;
    total_pages: number;
    current_page: number;
    next: any;
    previous: any;
    results: [Prompt];
}

export interface Prompt {
    id: number;
    node_name: string;
    prompt: string;
    date_created: string;
    last_updated: string;
    is_active: boolean;
    is_default: boolean;
}