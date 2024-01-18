

const controller = {
    getAll: async (req, res) => {
        let searchString = req.query.string

        res.json({ message: "getAll", searchString: searchString })
    },
    getById: async (req, res) => {
        let id = req.params.id
        res.json({ message: "getById", id: id })
    },
    searchOne: async (req, res) => {
        let name = req.params.name
        res.json({ message: "searchOne", name: name })
    },
    insert: async (req, res) => {
        let body = req.body
        res.json({ message: "insert", body: body })
    },
    update: async (req, res) => {
        let id = req.params.id
        let body = req.body
        res.json({ message: "update", id: id, body: body })
    },
    delete: async (req, res) => {
        let id = req.params.id
        res.json({ message: "delete", id: id })
    }
}

export default controller