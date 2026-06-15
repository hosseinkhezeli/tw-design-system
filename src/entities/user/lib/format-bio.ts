'use client';

import DOMPurify from 'dompurify';

const URL_REGEX =
  /\b((?:https?:\/\/|www\.)[^\s<]+|(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s<]*)?)\b/gi;

function linkify(text: string): string {
  return text.replace(URL_REGEX, (url) => {
    const href = /^https?:\/\//i.test(url) ? url : `https://${url}`;

    return `<a href="${href}" target="_blank" rel="noopener noreferrer" classname="text-primay">${url}</a>`;
  });
}

export function formatBio(bio?: string): string {
  if (!bio) return '-';
  const html = linkify(bio).replace(/\n/g, '<br />');

  return DOMPurify?.sanitize?.(html, {
    ALLOWED_TAGS: ['strong', 'b', 'em', 'i', 'br', 'a'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'classname'],
  });
}
