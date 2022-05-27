import * as mongoose from 'mongoose';
import {EmpDepartmentVo} from "codeartist-core";

const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: {
    type: String,
    enum: ['DISTRIBUTION', "COUNTER"]
  },
  name: String
});

const empDepartmentModel = mongoose.model<EmpDepartmentVo & mongoose.Document>('EmpDepartment', schema);

export default empDepartmentModel;
