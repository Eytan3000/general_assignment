import xss from 'xss';

export function sanitizeBody(body: any): any {
  if (typeof body !== 'object' || body === null) return body;

  if (Array.isArray(body)) {
    return body.map(sanitizeBody);
  }

  const sanitized: Record<string, any> = {};

  for (const prop in body) {
    if (body.hasOwnProperty(prop)) {
      sanitized[prop] =
        typeof body[prop] === 'object'
          ? sanitizeBody(body[prop])
           : xss(body[prop]);
    }
  }

  return sanitized;
}

console.log(xss('<img src="xss" onerror="alert(1)">'));

