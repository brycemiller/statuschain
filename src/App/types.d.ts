import { Drizzle } from "@drizzle/store";
import { Store } from "redux";
import UpdateTypes from "../Update/types";

declare namespace AppTypes {
    interface IProps {
        drizzle: any;
        drizzleState: any;
    }

    interface IState {
        getCountDataKey: any;
        loading: boolean;
        drizzleState: any;
        updates: UpdateTypes.IUpdate[];
    }
}

export default AppTypes;
