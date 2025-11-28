import React, { useMemo, useState, useEffect } from "react";

const MESES_PT = [
  "JANEIRO",
  "FEVEREIRO",
  "MARÇO",
  "ABRIL",
  "MAIO",
  "JUNHO",
  "JULHO",
  "AGOSTO",
  "SETEMBRO",
  "OUTUBRO",
  "NOVEMBRO",
  "DEZEMBRO",
];

const DIAS_HEADER = ["D", "S", "T", "Q", "Q", "S", "S"];
const DIAS_PT = [
  "domingo",
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
];

// eventos estáticos (admin + filiados misturados)
const STATIC_EVENTS = [
  {
    id: 1,
    title: "Hackathon reúne estagiários de Tecnologia e Educação",
    description:
      "Um dos eventos mais promissores para a integração entre educação, tecnologia e gestão pública, o 1º Hackathon Caraguatatuba promoveu soluções inovadoras para a rede municipal de ensino.",
    date: "2025-11-15",
    time: "07:00",
    time_end: "13:00",
    location: "Instituto Federal de São Paulo (IFSP) – Campus Caraguatatuba",
    slug: "hackathon-estagiarios-tecnologia-educacao",
  },
  {
    id: 2,
    title: "Premiação das equipes vencedoras do 1º Hackathon Caraguatatuba",
    description:
      "Premiação do 1º Hackathon Caraguatatuba, promovido pela Secretaria Municipal de Educação em colaboração com o IFSP, FATEC e Centro Universitário Módulo.",
    date: "2025-12-15",
    time: "14:00",
    time_end: "16:00",
    location: "Salão Monteiro Lobato da Secretaria Municipal de Educação",
    slug: "premiacao-1-hackathon-caraguatatuba",
  },
  {
    id: 3,
    title: "Feira de Inovação Educacional 2025",
    description:
      "Apresentação de projetos e soluções tecnológicas desenvolvidas por professores e estudantes das escolas municipais.",
    date: "2025-11-30",
    time: "14:00",
    time_end: "16:00",
    location: "Centro Cultural Adaly Coelho Passos",
    slug: "feira-inovacao-educacional-2025",
  },
];

// helpers de data
const parseDate = (str) => new Date(`${str}T00:00:00`);
const ymd = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
const hhmm = (d) =>
  `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(
    2,
    "0"
  )}`;

const sortKeyStart = (e) => `${e.date}T${e.time || "00:00"}`;
const filterKeyEnd = (e) => `${e.date}T${e.time_end || e.time || "23:59"}`;

const monthKey = (y, m) => Number(y) * 12 + Number(m);

function buildCalendar(year, month, fallbackYear, fallbackMonth) {
  let y = year;
  let m = month;
  if (!Number.isFinite(y) || !Number.isFinite(m)) {
    y = fallbackYear;
    m = fallbackMonth;
  }

  const first = new Date(y, m, 1);
  const firstDow = first.getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const grid = [];
  const prevLastDate = new Date(y, m, 0).getDate();

  // dias anteriores
  for (let i = firstDow; i > 0; i--) {
    const d = prevLastDate - i + 1;
    const date = new Date(y, m - 1, d);
    grid.push(dayObj(date, y, m));
  }

  // dias do mês
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(y, m, d);
    grid.push(dayObj(date, y, m));
  }

  // completa até múltiplo de 7
  while (grid.length % 7 !== 0) {
    const last = grid[grid.length - 1];
    const date = parseDate(last.dateStr);
    const next = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );
    grid.push(dayObj(next, y, m));
  }

  // garante 6 linhas (42 células)
  while (grid.length < 42) {
    const last = grid[grid.length - 1];
    const date = parseDate(last.dateStr);
    const next = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );
    grid.push(dayObj(next, y, m));
  }

  return grid;
}

function dayObj(date, refY, refM) {
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();
  const dateStr = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(
    2,
    "0"
  )}`;
  const inMonth = y === refY && m === refM;
  return { key: dateStr, day: d, dateStr, inMonth };
}

export default function CalendarioEventos() {
  // eventos válidos
  const events = useMemo(
    () =>
      STATIC_EVENTS.filter(
        (e) => typeof e.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(e.date)
      ),
    []
  );

  const today = useMemo(() => new Date(), []);
  const baseYear = today.getFullYear();
  const baseMonth = today.getMonth();
  const nowKey = `${ymd(today)}T${hhmm(today)}`;

  const pageSize = 5;

  // estado principal
  const [year, setYear] = useState(baseYear);
  const [month, setMonth] = useState(baseMonth);
  const [selectedDate, setSelectedDate] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const calendarDays = useMemo(
    () => buildCalendar(year, month, baseYear, baseMonth),
    [year, month, baseYear, baseMonth]
  );

  // helpers (principal)
  const getMonthUpcomingEvents = (y, m) => {
    const list = events
      .filter((e) => {
        const d = parseDate(e.date);
        return d.getFullYear() === y && d.getMonth() === m;
      })
      .sort((a, b) => sortKeyStart(a).localeCompare(sortKeyStart(b)));

    if (y === baseYear && m === baseMonth) {
      return list.filter((e) => filterKeyEnd(e) >= nowKey);
    }
    return list;
  };

  const monthUpcomingEvents = useMemo(
    () => getMonthUpcomingEvents(year, month),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [events, year, month, baseYear, baseMonth, nowKey]
  );

  const eventsForDate = (dateStr) => {
    if (year === baseYear && month === baseMonth) {
      return events.filter(
        (e) => e.date === dateStr && filterKeyEnd(e) >= nowKey
      );
    }
    return events.filter((e) => e.date === dateStr);
  };

  const countEvents = (dateStr) => eventsForDate(dateStr).length;
  const hasEvents = (dateStr) => countEvents(dateStr) > 0;

  const badgeTitle = (dateStr) => {
    const n = countEvents(dateStr);
    return `${n} evento${n > 1 ? "s" : ""} no dia`;
  };

  const canPrev = () =>
    year > baseYear || (year === baseYear && month > baseMonth);

  const handlePrevMonth = () => {
    if (!canPrev()) return;
    const d = new Date(year, month - 1, 1);
    const ny = d.getFullYear();
    const nm = d.getMonth();
    setYear(ny);
    setMonth(nm);
    setVisibleCount(pageSize);
    syncSelectedToMonth(ny, nm);
  };

  const handleNextMonth = () => {
    const d = new Date(year, month + 1, 1);
    const ny = d.getFullYear();
    const nm = d.getMonth();
    setYear(ny);
    setMonth(nm);
    setVisibleCount(pageSize);
    syncSelectedToMonth(ny, nm);
  };

  const syncSelectedToMonth = (y, m) => {
    const list = getMonthUpcomingEvents(y, m);
    if (!list.length) {
      setSelectedDate(null);
      setOpenId(null);
      return;
    }
    setSelectedDate(list[0].date);
    setOpenId(list[0].id);
  };

  // init: seleciona primeiro evento do mês atual
  useEffect(() => {
    syncSelectedToMonth(baseYear, baseMonth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fmtDM = (dateStr) => {
    const d = parseDate(dateStr);
    return `${String(d.getDate()).padStart(2, "0")}/${String(
      d.getMonth() + 1
    ).padStart(2, "0")}`;
  };

  const fmtDiaSemanaData = (dateStr) => {
    const d = parseDate(dateStr);
    return `${DIAS_PT[d.getDay()]} (${fmtDM(dateStr)})`;
  };

  const fmtHorario = (ev) => {
    if (ev.time && ev.time_end) return `${ev.time}–${ev.time_end}`;
    return ev.time || ev.time_end || "";
  };

  const mesAnoLabel = () => `${MESES_PT[month]} - ${year}`;

  const isSelected = (dateStr) => selectedDate === dateStr;

  const isBlockedDay = (day) => {
    if (day.inMonth) return false;
    const t = parseDate(day.dateStr);
    return (
      monthKey(t.getFullYear(), t.getMonth()) < monthKey(baseYear, baseMonth)
    );
  };

  const handleDayClick = (day) => {
    if (isBlockedDay(day)) return;
    selectOrCycleDate(day.dateStr);
  };

  const selectOrCycleDate = (dateStr) => {
    const d = parseDate(dateStr);
    const targetKey = monthKey(d.getFullYear(), d.getMonth());
    if (targetKey < monthKey(baseYear, baseMonth)) return;

    let ny = year;
    let nm = month;

    if (d.getFullYear() !== year || d.getMonth() !== month) {
      ny = d.getFullYear();
      nm = d.getMonth();
      setYear(ny);
      setMonth(nm);
      setVisibleCount(pageSize);
    }

    setSelectedDate(dateStr);

    const monthList = getMonthUpcomingEvents(ny, nm);
    const dayList = monthList.filter((e) => e.date === dateStr);

    if (!dayList.length) {
      setOpenId(null);
      return;
    }

    let target;
    if (openId && selectedDate === dateStr) {
      const idx = dayList.findIndex((e) => e.id === openId);
      target = dayList[(idx + 1) % dayList.length];
    } else {
      target = dayList[0];
    }

    setOpenId(target.id);

    const idxAll = monthList.findIndex((e) => e.id === target.id);
    if (idxAll >= visibleCount) {
      setVisibleCount(Math.ceil((idxAll + 1) / pageSize) * pageSize);
    }

    setTimeout(() => {
      const el = document.getElementById(`ev-${target.id}`);
      if (el) {
        const rect = el.getBoundingClientRect();
        const top =
          window.pageYOffset +
          rect.top -
          (window.innerHeight - rect.height) / 2 -
          24;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      }
    }, 0);
  };

  const openEvent = (ev) => {
    const d = parseDate(ev.date);
    if (d.getFullYear() !== year || d.getMonth() !== month) {
      const ny = d.getFullYear();
      const nm = d.getMonth();
      setYear(ny);
      setMonth(nm);
      setVisibleCount(pageSize);
    }
    setSelectedDate(ev.date);
    setOpenId((prev) => (prev === ev.id ? null : ev.id));
  };

  // --------- MODAL EVENTOS ANTERIORES ---------
  const [showPast, setShowPast] = useState(false);
  const [pastYear, setPastYear] = useState(null);
  const [pastMonth, setPastMonth] = useState(null);
  const [pastSelectedDate, setPastSelectedDate] = useState(null);
  const [pastOpenId, setPastOpenId] = useState(null);
  const [pastMinYear, setPastMinYear] = useState(null);
  const [pastMinMonth, setPastMinMonth] = useState(null);
  const [pastMaxYear, setPastMaxYear] = useState(null);
  const [pastMaxMonth, setPastMaxMonth] = useState(null);

  const allPastEventsDesc = useMemo(() => {
    return events
      .filter((e) => filterKeyEnd(e) < nowKey)
      .sort((a, b) => filterKeyEnd(b).localeCompare(filterKeyEnd(a)));
  }, [events, nowKey]);

  const getMonthPastEvents = (y, m) => {
    return events
      .filter((e) => {
        const d = parseDate(e.date);
        if (d.getFullYear() !== y || d.getMonth() !== m) return false;
        const pastKey = filterKeyEnd(e);
        return pastKey < nowKey;
      })
      .sort((a, b) => filterKeyEnd(b).localeCompare(filterKeyEnd(a)));
  };

  const monthPastEvents = useMemo(() => {
    if (pastYear == null || pastMonth == null) return [];
    return getMonthPastEvents(pastYear, pastMonth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events, pastYear, pastMonth, nowKey]);

  const pastCalendarDays =
    pastYear != null && pastMonth != null
      ? buildCalendar(pastYear, pastMonth, pastYear, pastMonth)
      : [];

  const syncPastSelectedToMonth = (y, m) => {
    const list = getMonthPastEvents(y, m);
    if (!list.length) {
      setPastSelectedDate(null);
      setPastOpenId(null);
      return;
    }
    setPastSelectedDate(list[0].date);
    setPastOpenId(list[0].id);
  };

  const openPastModal = () => {
    const all = allPastEventsDesc;
    if (!all.length) {
      setPastYear(baseYear);
      setPastMonth(baseMonth);
      setPastMinYear(baseYear);
      setPastMaxYear(baseYear);
      setPastMinMonth(baseMonth);
      setPastMaxMonth(baseMonth);
      setPastSelectedDate(null);
      setPastOpenId(null);
      setShowPast(true);
      return;
    }

    const months = all.map((e) => {
      const d = parseDate(e.date);
      return { y: d.getFullYear(), m: d.getMonth() };
    });

    const min = months[months.length - 1];
    const max = months[0];

    setPastMinYear(min.y);
    setPastMinMonth(min.m);
    setPastMaxYear(max.y);
    setPastMaxMonth(max.m);
    setPastYear(max.y);
    setPastMonth(max.m);
    syncPastSelectedToMonth(max.y, max.m);
    setShowPast(true);
  };

  const closePastModal = () => {
    setShowPast(false);
  };

  const canPastPrev = () => {
    if (pastYear == null || pastMonth == null) return false;
    return (
      pastYear > pastMinYear ||
      (pastYear === pastMinYear && pastMonth > pastMinMonth)
    );
  };

  const canPastNext = () => {
    if (pastYear == null || pastMonth == null) return false;
    return (
      pastYear < pastMaxYear ||
      (pastYear === pastMaxYear && pastMonth < pastMaxMonth)
    );
  };

  const pastPrevMonth = () => {
    if (!canPastPrev()) return;
    const d = new Date(pastYear, pastMonth - 1, 1);
    const ny = d.getFullYear();
    const nm = d.getMonth();
    setPastYear(ny);
    setPastMonth(nm);
    setPastSelectedDate(null);
    setPastOpenId(null);
    syncPastSelectedToMonth(ny, nm);
  };

  const pastNextMonth = () => {
    if (!canPastNext()) return;
    const d = new Date(pastYear, pastMonth + 1, 1);
    const ny = d.getFullYear();
    const nm = d.getMonth();
    setPastYear(ny);
    setPastMonth(nm);
    setPastSelectedDate(null);
    setPastOpenId(null);
    syncPastSelectedToMonth(ny, nm);
  };

  const pastEventsForDate = (dateStr) => {
    return events.filter((e) => e.date === dateStr && filterKeyEnd(e) < nowKey);
  };

  const countPastEvents = (dateStr) => pastEventsForDate(dateStr).length;
  const hasPastEvent = (dateStr) => countPastEvents(dateStr) > 0;

  const isPastSelected = (dateStr) => pastSelectedDate === dateStr;

  const isBlockedPastDay = (day) => {
    if (day.inMonth) return false;
    const t = parseDate(day.dateStr);
    const key = monthKey(t.getFullYear(), t.getMonth());
    const minKey = monthKey(pastMinYear, pastMinMonth);
    const maxKey = monthKey(pastMaxYear, pastMaxMonth);
    if (!Number.isFinite(minKey) || !Number.isFinite(maxKey)) return false;
    return key < minKey || key > maxKey;
  };

  const selectOrCycleDatePast = (dateStr) => {
    const d = parseDate(dateStr);
    const targetKey = monthKey(d.getFullYear(), d.getMonth());
    const maxKey = monthKey(pastMaxYear, pastMaxMonth);
    if (Number.isFinite(maxKey) && targetKey > maxKey) return;

    let ny = pastYear;
    let nm = pastMonth;

    const monthChanged =
      d.getFullYear() !== pastYear || d.getMonth() !== pastMonth;
    if (monthChanged) {
      ny = d.getFullYear();
      nm = d.getMonth();
      setPastYear(ny);
      setPastMonth(nm);
    }

    const list = getMonthPastEvents(ny, nm); // DESC
    const dayList = list.filter((e) => e.date === dateStr);

    if (!dayList.length) {
      setPastSelectedDate(dateStr);
      setPastOpenId(null);
      return;
    }

    let target;
    if (pastOpenId && pastSelectedDate === dateStr) {
      const idx = dayList.findIndex((e) => e.id === pastOpenId);
      target = dayList[(idx + 1) % dayList.length];
    } else {
      target = dayList[0];
    }

    setPastSelectedDate(dateStr);
    setPastOpenId(target.id);

    setTimeout(() => {
      const el = document.getElementById(`past-ev-${target.id}`);
      const scroller = document.getElementById("pastList");
      if (el && scroller) {
        const childRect = el.getBoundingClientRect();
        const parentRect = scroller.getBoundingClientRect();
        const offset = el.offsetTop - scroller.scrollTop;
        const targetScroll =
          offset - (parentRect.height - childRect.height) / 2 - 16;
        scroller.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
    }, 0);
  };

  const handlePastDayClick = (day) => {
    if (isBlockedPastDay(day)) return;
    selectOrCycleDatePast(day.dateStr);
  };

  const openPastEvent = (ev) => {
    const d = parseDate(ev.date);
    if (d.getFullYear() !== pastYear || d.getMonth() !== pastMonth) {
      const ny = d.getFullYear();
      const nm = d.getMonth();
      setPastYear(ny);
      setPastMonth(nm);
    }
    setPastSelectedDate(ev.date);
    setPastOpenId((prev) => (prev === ev.id ? null : ev.id));
  };

  const pastMesAnoLabel = () =>
    pastYear != null && pastMonth != null
      ? `${MESES_PT[pastMonth]} - ${pastYear}`
      : "";

  // ESC fecha modal + bloqueia scroll
  useEffect(() => {
    if (!showPast) {
      document.documentElement.style.overflow = "";
      return;
    }
    document.documentElement.style.overflow = "hidden";

    const listener = (e) => {
      if (e.key === "Escape") closePastModal();
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
      document.documentElement.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPast]);

  return (
    <section className="cal-events">
      <div className="container">
        {/* Cabeçalho */}
        <div className="cal-events__header">
          <span className="cal-events__chip">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="cal-events__chip-icon"
            >
              <path
                fillRule="evenodd"
                d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                clipRule="evenodd"
              />
            </svg>
            PRÓXIMOS EVENTOS
          </span>
          <div className="cal-events__line" />
        </div>

        <div className="cal-events__layout">
          {/* LISTA */}
          <div className="cal-events__list">
            {monthUpcomingEvents.length === 0 && (
              <p className="cal-events__empty">Nenhum evento neste mês.</p>
            )}

            {monthUpcomingEvents.slice(0, visibleCount).map((ev) => (
              <article
                key={ev.id}
                id={`ev-${ev.id}`}
                className="cal-events__item"
              >
                <button
                  type="button"
                  className="cal-events__item-btn"
                  onClick={() => openEvent(ev)}
                  aria-expanded={openId === ev.id}
                >
                  <h3 className="cal-events__item-title">
                    <span>{ev.title}</span>
                    <span className="cal-events__item-date">
                      ({fmtDM(ev.date)})
                    </span>
                  </h3>
                  <svg
                    className={
                      "cal-events__item-arrow " +
                      (openId === ev.id ? "cal-events__item-arrow--open" : "")
                    }
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {openId === ev.id && (
                  <div className="cal-events__details">
                    <p>{ev.description}</p>
                    <div>
                      <span className="cal-events__details-label">Dia:</span>{" "}
                      {fmtDiaSemanaData(ev.date)}
                    </div>
                    {(ev.time || ev.time_end) && (
                      <div>
                        <span className="cal-events__details-label">
                          Horário:
                        </span>{" "}
                        {fmtHorario(ev)}
                      </div>
                    )}
                    {ev.location && (
                      <div>
                        <span className="cal-events__details-label">
                          Local:
                        </span>{" "}
                        {ev.location}
                      </div>
                    )}
                    <div className="cal-events__details-actions">
                      <button type="button" className="cal-events__btn-primary">
                        VER DETALHES
                      </button>
                    </div>
                  </div>
                )}
              </article>
            ))}

            {monthUpcomingEvents.length > visibleCount && (
              <div className="cal-events__load-more">
                <button
                  type="button"
                  className="cal-events__btn-primary"
                  onClick={() => setVisibleCount((prev) => prev + pageSize)}
                >
                  Carregar mais (+5)
                </button>
              </div>
            )}
          </div>

          {/* CALENDÁRIO */}
          <div className="cal-events__calendar">
            <div className="cal-events__calendar-nav">
              <button
                type="button"
                onClick={handlePrevMonth}
                disabled={!canPrev()}
                className={
                  "cal-events__nav-btn " +
                  (!canPrev() ? "cal-events__nav-btn--disabled" : "")
                }
                aria-label="Mês anterior"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="cal-events__nav-icon"
                >
                  <path
                    d="M15 6l-6 6 6 6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="cal-events__month-label">{mesAnoLabel()}</div>
              <button
                type="button"
                onClick={handleNextMonth}
                className="cal-events__nav-btn"
                aria-label="Próximo mês"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="cal-events__nav-icon"
                >
                  <path
                    d="M9 6l6 6-6 6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="cal-events__calendar-shell">
              <div className="cal-events__weekday-row">
                {DIAS_HEADER.map((l) => (
                  <div key={l} className="cal-events__weekday-cell">
                    {l}
                  </div>
                ))}
              </div>

              <div className="cal-events__days-grid">
                {calendarDays.map((d) => {
                  const blocked = isBlockedDay(d);
                  const selected =
                    !blocked && isSelected(d.dateStr) && d.inMonth;
                  const hasEv = !blocked && hasEvents(d.dateStr) && d.inMonth;
                  const outside = !blocked && !d.inMonth;
                  const count = countEvents(d.dateStr);

                  let statusClass = "";
                  if (blocked) statusClass = "cal-day--blocked";
                  else if (selected) statusClass = "cal-day--selected";
                  else if (hasEv) statusClass = "cal-day--has-event";
                  else if (outside) statusClass = "cal-day--outside";
                  else statusClass = "cal-day--normal";

                  return (
                    <button
                      key={d.key}
                      type="button"
                      className={`cal-day-btn ${statusClass}`}
                      onClick={() => handleDayClick(d)}
                      disabled={blocked}
                      aria-label={fmtDiaSemanaData(d.dateStr)}
                      title={count > 1 ? badgeTitle(d.dateStr) : undefined}
                    >
                      <span>{d.day}</span>
                      {count > 1 && (
                        <span className="cal-day__badge">{count}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              className="cal-events__btn-secondary"
              onClick={openPastModal}
            >
              <svg
                className="cal-events__btn-secondary-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M12 8v5l3 3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 12a9 9 0 1 1-9-9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Eventos anteriores
            </button>
          </div>
        </div>
      </div>

      {/* MODAL EVENTOS ANTERIORES */}
      {showPast && (
        <div className="cal-modal">
          <div className="cal-modal__backdrop" onClick={closePastModal} />
          <div className="cal-modal__content">
            <div className="cal-modal__header">
              <div className="cal-modal__title">
                <svg
                  className="cal-modal__title-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M12 8v5l3 3"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 12a9 9 0 1 1-9-9"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h2>Eventos Anteriores</h2>
              </div>
              <button
                type="button"
                className="cal-modal__close"
                onClick={closePastModal}
                aria-label="Fechar"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    d="M6 18 18 6M6 6l12 12"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="cal-modal__body">
              {/* lista */}
              <div id="pastList" className="cal-modal__list">
                {monthPastEvents.length === 0 && (
                  <p className="cal-events__empty">
                    Nenhum evento anterior neste mês.
                  </p>
                )}

                {monthPastEvents.map((ev) => (
                  <article
                    key={ev.id}
                    id={`past-ev-${ev.id}`}
                    className="cal-modal__item"
                  >
                    <button
                      type="button"
                      className="cal-events__item-btn"
                      onClick={() => openPastEvent(ev)}
                      aria-expanded={pastOpenId === ev.id}
                    >
                      <h3 className="cal-modal__item-title">
                        <span>{ev.title}</span>
                        <span className="cal-events__item-date">
                          ({fmtDM(ev.date)})
                        </span>
                      </h3>
                      <svg
                        className={
                          "cal-events__item-arrow " +
                          (pastOpenId === ev.id
                            ? "cal-events__item-arrow--open"
                            : "")
                        }
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {pastOpenId === ev.id && (
                      <div className="cal-events__details">
                        <p>{ev.description}</p>
                        <div>
                          <span className="cal-events__details-label">
                            Dia:
                          </span>{" "}
                          {fmtDiaSemanaData(ev.date)}
                        </div>
                        {(ev.time || ev.time_end) && (
                          <div>
                            <span className="cal-events__details-label">
                              Horário:
                            </span>{" "}
                            {fmtHorario(ev)}
                          </div>
                        )}
                        {ev.location && (
                          <div>
                            <span className="cal-events__details-label">
                              Local:
                            </span>{" "}
                            {ev.location}
                          </div>
                        )}
                        <div className="cal-events__details-actions">
                          <button
                            type="button"
                            className="cal-events__btn-primary"
                          >
                            VER DETALHES
                          </button>
                        </div>
                      </div>
                    )}
                  </article>
                ))}
              </div>

              {/* mini calendário */}
              <div className="cal-modal__calendar-wrapper">
                <div className="cal-events__calendar-nav cal-modal__calendar-nav">
                  <button
                    type="button"
                    onClick={pastPrevMonth}
                    disabled={!canPastPrev()}
                    className={
                      "cal-events__nav-btn " +
                      (!canPastPrev() ? "cal-events__nav-btn--disabled" : "")
                    }
                    aria-label="Mês anterior"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="cal-events__nav-icon"
                    >
                      <path
                        d="M15 6l-6 6 6 6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <div className="cal-events__month-label">
                    {pastMesAnoLabel()}
                  </div>
                  <button
                    type="button"
                    onClick={pastNextMonth}
                    disabled={!canPastNext()}
                    className={
                      "cal-events__nav-btn " +
                      (!canPastNext() ? "cal-events__nav-btn--disabled" : "")
                    }
                    aria-label="Próximo mês"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="cal-events__nav-icon"
                    >
                      <path
                        d="M9 6l6 6-6 6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                <div className="cal-events__calendar-shell">
                  <div className="cal-events__weekday-row">
                    {DIAS_HEADER.map((l) => (
                      <div key={l} className="cal-events__weekday-cell">
                        {l}
                      </div>
                    ))}
                  </div>

                  <div className="cal-events__days-grid">
                    {pastCalendarDays.map((d) => {
                      const blocked = isBlockedPastDay(d);
                      const selected =
                        !blocked && isPastSelected(d.dateStr) && d.inMonth;
                      const hasEv =
                        !blocked && hasPastEvent(d.dateStr) && d.inMonth;
                      const outside = !blocked && !d.inMonth;
                      const count = countPastEvents(d.dateStr);

                      let statusClass = "";
                      if (blocked) statusClass = "cal-day--blocked";
                      else if (selected) statusClass = "cal-day--selected";
                      else if (hasEv) statusClass = "cal-day--has-event";
                      else if (outside) statusClass = "cal-day--outside";
                      else statusClass = "cal-day--normal";

                      return (
                        <button
                          key={d.key}
                          type="button"
                          className={`cal-day-btn ${statusClass}`}
                          disabled={blocked}
                          onClick={() => handlePastDayClick(d)}
                          aria-label={fmtDiaSemanaData(d.dateStr)}
                          title={
                            count > 1
                              ? `${count} evento${count > 1 ? "s" : ""} no dia`
                              : undefined
                          }
                        >
                          <span>{d.day}</span>
                          {count > 1 && (
                            <span className="cal-day__badge">{count}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
