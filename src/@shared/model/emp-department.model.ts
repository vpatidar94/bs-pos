import * as mongoose from 'mongoose';
import {DEPT, EmpDepartmentVo} from "codeartist-core";

const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: {
    type: String,
    enum:  [DEPT.DISTRIBUTION, DEPT.COUNTER]
  },
  name: String
});

const empDepartmentModel = mongoose.model<EmpDepartmentVo & mongoose.Document>('EmpDepartment', schema);

export default empDepartmentModel;
