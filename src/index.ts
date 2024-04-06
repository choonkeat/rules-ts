
import { RuleEngine } from "./rules_engine";
import { User } from "./types";

var args = {
    Or: (a: boolean, b: boolean) => a || b,
    Greater: (a: number, b: number) => b > a,
    Points: (user: User) => user.Points,
    Email: (user: User) => user.Email,
    Equals: (a: number, b: number) => a === b,
    EndsWith: (a: string, b: string) => b.endsWith(a),
    ToLowerCase: (a: string) => a.toLowerCase(),
    True: () => true,
}

var users =
    [ { Points: 1, Email: "alice@example.com" }
    , { Points: 2, Email: "bob@abc.com" }
    , { Points: 3, Email: "charlie@abc.com" }
    , { Points: 4, Email: "david@abc.com" }
    , { Points: 5, Email: "eliot@example.com" }
    , { Points: 6, Email: "frank@abc.com" }
    ]

for (var user of users) {
    console.log(user,
        RuleEngine({
        ...args,
        User: (id: number) => user,
    }))
}
