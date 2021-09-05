import UpdateTypes from './../Update/types';

declare namespace UpdateListTypes {
    interface IProps {
        updates: UpdateTypes.IUpdate[];
    };

    interface IState {
        updates: UpdateTypes.IUpdate[];
    }
};

export default UpdateListTypes;
