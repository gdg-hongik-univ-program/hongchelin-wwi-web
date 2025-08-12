import React, { useEffect, useState } from "react";
import VoteItem from "../components/VoteItem";
import { getCandidates, submitVote } from "../api/vote";

const MAX_SELECT = 3;

export default function VotePage() {
  const [pollId] = useState("2025-07-hongchelin"); // 백엔드가 주는 값 사용
  const [candidates, setCandidates] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const list = await getCandidates();
        setCandidates(list);
      } catch (e) {
        alert("후보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toggle = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else if (next.size < MAX_SELECT) next.add(id);
      return next;
    });
  };

  const onSubmit = async () => {
    if (selected.size === 0) return alert("최소 1개 이상 선택하세요.");
    try {
      setSubmitting(true);
      await submitVote({ pollId, selectedIds: Array.from(selected) });
      alert("투표가 완료되었습니다!");
      // 필요 시 리다이렉트/비활성화
    } catch (e) {
      alert("투표 제출에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const isLimitReached = selected.size >= MAX_SELECT;

  if (loading) return <div className="p-6">로딩 중…</div>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-center font-bold mb-4">
        2025년 7월 홍슐랭 최종 후보
      </h1>

      <div className="space-y-2">
        {candidates.map((c) => (
          <VoteItem
            key={c.id}
            candidate={c}
            checked={selected.has(c.id)}
            disabled={isLimitReached}
            onToggle={toggle}
          />
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-500">
        선택 {selected.size} / {MAX_SELECT}
      </div>

      <button
        onClick={onSubmit}
        disabled={submitting}
        className="w-full mt-4 bg-red-500 text-white py-3 rounded-md disabled:opacity-60"
      >
        {submitting ? "제출 중..." : "투표하기"}
      </button>
    </div>
  );
}
