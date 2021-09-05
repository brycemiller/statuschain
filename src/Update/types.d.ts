declare namespace UpdateTypes {
    enum Severity {
        Critical = 0,
        Major = 1,
        Minor = 2,
        None = 3,
        Maintenance = 4
    }

    interface IUpdate {
        id: number;
        impact: Severity;
        heading: string;
        message: string;
        timestamp: number;
    }

    interface IProps {
        id: number;
        impact: Severity;
        heading: string;
        message: string;
        timestamp: number;
    }
}

export default UpdateTypes;
