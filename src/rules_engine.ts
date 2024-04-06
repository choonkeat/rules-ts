/* this file is generated. do not edit by hand */
export function RuleEngine({ EndsWith, ToLowerCase, Email, User, Or, Greater, Points, Equals, True }) {
    if (EndsWith(ToLowerCase("@ABC.COM"), ToLowerCase(Email(User(42))))) {
        return "Denied";
    }

    if (Or(Greater(4, Points(User(42))), Equals(4, Points(User(42))))) {
        return "Allowed";
    }

    return "Pending";
};
