import { Drizzle } from "@drizzle/store";
import { Store } from "redux";
import UpdateTypes from "../Update/types";

declare namespace AppTypes {
    interface IProps {
        drizzleProvider: Drizzle;
        drizzleStore: Store;
    }

    interface IState {
        loading: boolean;
        drizzleState: any;
        updates: UpdateTypes.IUpdate[];
    }
}

export default AppTypes;
