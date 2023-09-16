const query = new URLSearchParams(window.location.search)
const testStateParam = query.get('testState')
let testState: any
try {
  testState = testStateParam && JSON.parse(testStateParam)
} catch {
  testState = null
}
export default testState
