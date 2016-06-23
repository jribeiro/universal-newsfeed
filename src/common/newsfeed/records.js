
import { Record, List } from 'immutable';

export const Message = new Record({
    id: undefined,
    subject: '',
    body: '',
    posted_at: '',
    topics: new List(),
    tags: new List(),
    comments: new List(),
    isLoading: false,
    showComments: false
});

export const Comment = new Record({
    id: undefined,
    body: '',
    posted_at: ''
});
