import "./NicknameModal.css";
import Button from "./Button";
import { useState, useEffect } from "react";
// import { updateUserNickname } from "../api/post";

const NicknameModal = ({ onClose, onSave }) => {
  const [newNickname, setNewNickname] = useState("");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSave = async () => {
    if (newNickname.trim() === "") {
      return alert("닉네임을 입력하세요 !");
    }

    // try {
    //   const me = await updateUserNickname(newNickname.trim());
    //   onSave?.(me);
    //   onClose();
    // } catch (e) {
    //   const msg =
    //     e?.response?.data?.message ||
    //     e?.message ||
    //     "닉네임 변경에 실패했어요. 잠시 후 다시 시도해 주세요.";
    //   alert(msg);
    // }
    onSave?.(newNickname.trim());
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>닉네임 변경</h2>
        <input
          type="text"
          placeholder="새 닉네임 입력"
          value={newNickname}
          onChange={(e) => setNewNickname(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
        />
        <div className="modal-buttons">
          <Button onClick={onClose} type="nickname">
            취소
          </Button>
          <Button onClick={handleSave} type="nickname">
            저장
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NicknameModal;
