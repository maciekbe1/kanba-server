import { Project, validate } from "../models/Project";

exports.getProject = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const project = await Project.findById(req.params.id);
    res.send(project);
};
exports.createProject = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let project = new Project({
        name: req.body.name,
        creatorID: req.body.creatorID,
        description: req.body.description,
        users: [req.body.creatorID],
        admins: [req.body.creatorID]
    });

    project = await project.save();
    res.send(project);
};
exports.deleteProject = async (req, res) => {
    const project = await Project.findByIdAndRemove(req.params.id);
    if (!project)
        return res
            .status(404)
            .send("The project with the given ID is not exist.");
    res.send(project);
};
