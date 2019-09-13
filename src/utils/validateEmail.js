export default function isEmail(email) {
  // eslint-disable-next-line no-control-regex
  return /^[^@]+@[^@]+$/.test(email);
}
