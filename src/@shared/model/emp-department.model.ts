import * as mongoose from 'mongoose';
import {EmpDepartmentVo} from "codeartist-core";

const schema = new mongoose.Schema({
  userId: {},
  type: {
    type: String,
    enum: ['DISTRIBUTION', "COUNTER"]
  },
  name: String
});

const empDepartmentModel = mongoose.model<EmpDepartmentVo & mongoose.Document>('EmpDepartment', schema);

export default empDepartmentModel;
