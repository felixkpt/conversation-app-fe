type Props = {
    title?: string;
    loading: boolean;
};

const SubmitButton = ({ title, loading }: Props) => {
    return (
        <div>
            <button className="btn btn-success" type="submit" disabled={loading}>
                {loading ? 'Loading...' : title || 'Submit'}
            </button>
        </div>
    );
};

export default SubmitButton;
