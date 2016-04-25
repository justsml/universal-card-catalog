import fetch          from 'isomorphic-fetch'
import Colors         from 'material-ui/styles/colors';

/**
 * @description global named styles for site & UI components
 */
export const AppStyle = {
  'root': {
    margin: 12,
  },
  'errorStyle': {
    color: Colors.red500,
  },
  'underlineStyle': {
    borderColor: Colors.blue700,
  },
};


export function fetcher(url, opts) {
  let token     = localStorage.getItem('token')
  let {headers} = opts;
  headers = Object.assign({}, headers || {}, {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });
  if (token && token.length > 10) {
    headers.authorization = `Bearer ${token}`;
  }
  if (opts.headers) {
    delete opts.headers;
  }
  return fetch(url,
    Object.assign({
      'credentials': 'include',
      'headers': headers,
    }, opts))
    .then(checkHttpStatus)
    .then(parseJSON)
}
export function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}
export function parseJSON(response) {
  return response.json()
}

