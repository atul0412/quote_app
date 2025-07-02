import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_COMMENT } from '../GraphQL/mutation';
import { GET_ALL_QUOTES } from '../GraphQL/queries';

export default function CommentForm({ quoteId }) {
    const [text, setText] = useState('');
    const [createComment, { loading }] = useMutation(CREATE_COMMENT, {
        refetchQueries: [{ query: GET_ALL_QUOTES }],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        createComment({
            variables: {
                input: {
                    quoteId,
                    text,
                },
            },
        });
        setText('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Add a comment'
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button type='submit' disabled={loading}>
                {loading ? 'Posting...' : 'Comment'}
            </button>
        </form>
    );
}
