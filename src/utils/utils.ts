const rules = {
  isRequired: {
    errorMessage: "Value is required.",
    validation: ({value}) => value !== ""
  },
  isNumber: {
    errorMessage: "Value is not a number.",
    validation: ({value}) => !isNaN(value)
  },
  isBetween:{
    errorMessage: "Page does not exist.",
    validation: ({value, lowerLimit, upperLimit}) => lowerLimit <= value && value <= upperLimit
  }
}

interface ValidationObject {
  rule:string,
  value:any,
  lowerLimit?:any,
  upperLimit?:any
}

const getErrors = (option:Array<ValidationObject>):Array<string> => {
  return option.map(validElement => {
    if(validElement.value == "" && validElement.rule !== "isRequired") return;
    if(!rules[validElement.rule].validation(validElement)) return rules[validElement.rule].errorMessage;
  }).filter(el => el !== undefined);
}

export {
  getErrors
}
