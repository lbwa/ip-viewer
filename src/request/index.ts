import http from './axios'

export async function detectFromGoogle() {
  // edit DETECT_FORM_XXX variables from .env.local
  // const { data } = await http.get(process.env.REACT_APP_DETECT_FROM_GOOGLE as string)
  const { data } = await http.get('https://api.github.com')
  return data
}
