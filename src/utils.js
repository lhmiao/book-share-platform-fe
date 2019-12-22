export const getCsrfToken = (key = 'csrfToken') => {
  const cookies = document.cookie
    .split('; ')
    .map(cookieString => cookieString.split('='));
  for(const [cookieKey, cookieValue] of cookies) {
    if (key === cookieKey) return cookieValue;
  }
  return undefined;
};

export const isCsrfSafeMethod = method => /^(get|head|options|trace)$/.test(method.toLowerCase());

export const getBookPreviewSrc = bookId => `/book/${bookId}/preview`;
