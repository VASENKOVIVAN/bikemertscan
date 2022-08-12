export default function (state, action) {
    switch (action.type) {

        case "increment":
            return {
                ...state,
                count: state.count + 1
            }

        case "decrement":
            return {
                ...state,
                count: state.count - 1
            }
        case "add":
            return [
                ...state,
                {
                    id: Date.now().toString(),
                    title: action.title
                }
            ]

        default:
            throw new Error()
    }
}