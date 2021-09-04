import { Drizzle } from "@drizzle/store";
import { Store } from "redux";

declare namespace AppTypes {
    interface IProps {
        drizzleProvider: Drizzle;
        drizzleStore: Store;
    };

    interface IState {
        loading: boolean;
        drizzleState: any;
    };
};
