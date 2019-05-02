import React from "react";

function SignOut() {
  return (
    <div className="wrap-auth">
      <div
        className="sign-out"
        onClick={() => {
          localStorage.removeItem("token");
          location.reload();
        }}
      >
        <span>SignOut</span>
      </div>
    </div>
  );
}
export default SignOut;
