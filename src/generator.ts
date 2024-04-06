
type FunctionCall = (string | number | FunctionCall)[]

type Rule = {
    outcome: string;
    condition: FunctionCall;
};

var rules : Rule[] =
    [ { outcome: "Denied"
      , condition:
          [ "EndsWith"
          , [ "ToLowerCase", "@ABC.COM" ]
          , [ "ToLowerCase", [ "Email", [ "User", 42 ] ] ], // if OOP or record, then User(42).Email.ToLowerCase() ?
          ]
      }
    , { outcome: "Allowed"
      , condition:
          [ "Or"
          , [ "Greater", 4, [ "Points", [ "User", 42 ] ] ] // no OOP or record attribute access User(42).Points
          , [ "Equals", 4, [ "Points", [ "User", 42 ] ] ]
          ]
      }
    , { outcome: "Pending"
      , condition: [ "True" ]
      }
    ];

function onlyUnique<T>(value : T, index : number, array : T[])  {
    return array.indexOf(value) === index;
}

// return all the function names
function functionNames(list : Rule[]) {
    return list.map(rule => functionNamesInFunctionCall(rule.condition)).flat().filter(onlyUnique);
}

function functionNamesInFunctionCall(call : FunctionCall): FunctionCall {
    let first = call[0];
    if (first === undefined) {
        return [];
    }
    return [first].concat(call.slice(1).map(arg => {
        if (typeof arg === "string") {
            return [];
        } else if (typeof arg === "number") {
            return [];
        } else {
            return functionNamesInFunctionCall(arg);
        }
    })).flat();
}

function rulesToCode(list : Rule[]) {
    return `/* this file is generated. do not edit by hand */
export function RuleEngine({ ${functionNames(list).join(", ")} }) {
${list.map(ruleToCode).join("\n\n")}
};`;
}

const indent = "    ";
function ruleToCode(rule : Rule) {
    if (rule.condition.length === 1 && rule.condition[0] === "True" ) {
        return `${indent}return "${rule.outcome}";`;
    }

    return `${indent}if (${functionCallToCode(rule.condition)}) {\n${indent}${indent}return "${rule.outcome}";\n${indent}}`;
}

function functionCallToCode(call : FunctionCall) : string {
    return call[0] + "(" + call.slice(1).map(argToCode).join(", ") + ")";
}

function argToCode(arg : string | number | FunctionCall) {
    if (typeof arg === "string") {
        return JSON.stringify(arg);
    } else if (typeof arg === "number") {
        return arg.toString();
    } else {
        return functionCallToCode(arg);
    }
}

console.log(rulesToCode(rules));
