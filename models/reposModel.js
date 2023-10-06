import mongoose from 'mongoose';
import reposSchema from '../schema/repos.js';

const reposModel = mongoose.model('repos', reposSchema);

export default reposModel;
