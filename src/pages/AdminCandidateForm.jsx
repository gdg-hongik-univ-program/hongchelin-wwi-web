import React, { useState } from "react";
import { createCandidate } from "../api/vote";
import { useNavigate } from "react-router-dom";

export default function AdminCandidateForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const onFile = (e) => {
    const f = e.target.files?.[0];
    setImageFile(f || null);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !imageFile) {
      alert("가게명과 이미지를 넣어주세요.");
      return;
    }
    try {
      setSubmitting(true);
      await createCandidate({ name, description, imageFile });
      alert("후보가 등록되었습니다.");
      setName(""); setDescription(""); setImageFile(null); setPreview(null);
      navigate(-1); // 필요 없으면 제거
    } catch (err) {
      console.error(err);
      alert("등록에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 mt-10">
        {/* 헤더 */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">후보 등록</h2>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← 돌아가기
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* 가게명 */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">가게명</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="오레노라멘 합정점"
              className="w-full h-11 rounded-md bg-gray-200 px-3 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* 설명 */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">설명</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="대표 메뉴, 위치, 특징 등"
              className="w-full rounded-md bg-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
            />
          </div>

          {/* 사진 업로드 */}
          <div className="space-y-2">
            <label className="block text-sm text-gray-700">사진</label>
            <div className="flex items-center gap-3">
              <label className="inline-flex items-center justify-center h-10 px-4 rounded-md border text-sm text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                이미지 선택
                <input type="file" accept="image/*" onChange={onFile} className="hidden" />
              </label>
              <span className="text-xs text-gray-500 truncate">
                {imageFile ? imageFile.name : "선택된 파일 없음"}
              </span>
            </div>

            {preview && (
              <img
                src={preview}
                alt="미리보기"
                className="mt-1 w-full rounded-md border object-cover"
              />
            )}
          </div>

          {/* 버튼 */}
          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="h-11 flex-1 rounded-md border text-sm text-gray-700 bg-white hover:bg-gray-50"
            >
              돌아가기
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="h-11 flex-[2] rounded-md bg-red-600 text-white text-sm font-semibold hover:bg-red-700 active:bg-red-800 disabled:opacity-60"
            >
              {submitting ? "저장 중..." : "저장"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
