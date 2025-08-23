
export default function Alert(props) {
  const { alert } = props;

  return (
    <div style={{ height: "50px" }}>
      {alert && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          <strong className="mx-3">{alert.msg}</strong>
        </div>
      )}
    </div>
  );
}
