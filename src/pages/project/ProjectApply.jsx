import React from 'react';

const ProjectApply = () => {
    return (
        <>
            <h1>3D, platform for searching side project or study!</h1>
            <form action="url" method="post">
                <label htmlFor="제목">제목</label>
                <input type="text" value="" id="제목" />
                <label htmlFor="장소">장소</label>
                <input type="text" id="장소" value="" />
                <label htmlFor="진행 방식">진행 방식</label>
                <select id="진행 방식">
                    <option>오프라인</option>
                    <option>온라인</option>
                    <option>둘 다</option>
                </select>
                <label htmlFor="모집인원">모집 인원</label>
                <select id="모집인원">
                    <option>3명 이하</option>
                    <option>3~8명</option>
                    <option>8명 이상</option>
                </select>
                <label htmlFor="주제">주제</label>
                <input type="text" id="주제" />
                <label htmlFor="내용">내용</label>
                <input type="text" id="내용" />
            </form>
            <button>CANCEL</button>
            <button type="submit">SUBMIT</button>
        </>
    );
};

export default ProjectApply;