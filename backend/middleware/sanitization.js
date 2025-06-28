import validator from 'validator';
import xss from 'xss'

export function sanitizeString(str, maxLength = 255) {
  if (typeof str !== 'string') return '';

  str = str.trim();

   if (str.length > maxLength) {
    str = str.substring(0, maxLength);
  }

  str = xss(str, {
    whiteList: {}, 
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script']
  });
  
  return str;
}

export function sanitizeUserId(userId) {
  const parsed = parseInt(userId);
  
  if (parsed <= 0) {
    throw new Error('Invalid user ID');
  }
  
  return parsed;
}

export function sanitizeMiddleware(req, res, next) {
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitizeString(req.body[key], 500);
      }
    });
  }
  
  next();
}