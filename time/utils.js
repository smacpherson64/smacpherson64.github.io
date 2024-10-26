////////////////////////////////
// #region . Components
////////////////////////////////

function App({ zones, fullSize }) {
  const unit = 100 / fullSize;

  const markerArray = React.useMemo(
    () => Array.from({ length: fullSize }),
    [fullSize]
  );

  const backgroundGrid = markerArray.map((_, i) => {
    const noonOfUTC = i === 23;

    let bgColor = "bg-white/15";

    if (i < 11) {
      bgColor = "bg-white/5";
    }

    if (i > 35) {
      bgColor = "bg-white/5";
    }

    if (noonOfUTC) {
      bgColor = "bg-red-500/50";
    }

    return (
      <div
        key={i}
        data-name="marker"
        className={`absolute top-0 w-[1px] h-screen ${bgColor}`}
        style={{ left: `${i * unit}%` }}
        aria-hidden
      />
    );
  });

  const markerNumbers = markerArray.map((_, i) => {
    // -12:00 to +14:00
    const number = i >= 36 ? i - 36 : i - 11;

    let color = "text-slate-200";

    if (i < 11) {
      color = "text-slate-200/30";
    }

    if (i > 35) {
      color = "text-slate-200/30";
    }

    return (
      <div
        key={i}
        data-name="marker"
        className={`absolute top-0 invisible sm:visible sm:text-[.6em] xl:text-[.8em] ${color}`}
        style={{ left: `${i * unit}%` }}
        aria-hidden
      >
        {number}
      </div>
    );
  });

  return (
    <main className="w-full min-h-screen relative pt-16 pb-48 text-xs">
      <section className="grid grid-cols-[20%_1fr] fixed top-0 w-full p-2 z-0">
        <div aria-hidden />
        <div data-name="markers" className="relative w-full h-[2em]">
          {backgroundGrid}
        </div>
      </section>

      <section className="grid grid-cols-[20%_1fr] fixed top-0 w-full p-2 bg-slate-800 z-10">
        <div aria-hidden />
        <div data-name="markers" className="relative w-full h-[2em]">
          {markerNumbers}
        </div>

        <div className="font-bold  h-[2em]">UTC</div>
        <div className="relative w-full">
          <div
            className="absolute top-0"
            style={{
              width: `${24 * unit}%`,
              left: `${11 * unit}%`,
            }}
          >
            <Line />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-[20%_1fr] min-h-screen p-2 w-full gap-y-4">
        {zones.map((data) => (
          <React.Fragment key={[data.region, data.timeZone].join("")}>
            <header className="flex flex-col leading-none gap-1">
              <abbr
                title={[data.timeZone, data.region, data.offset].join(" ")}
                className="font-bold md:hidden underline decoration-dotted"
              >
                {data.abbreviatedTimeZone}
              </abbr>

              <div className="md:hidden text-slate-400">
                {data.offset === data.abbreviatedTimeZone ? " " : data.offset}
              </div>

              <div className="hidden md:block font-bold">
                {data.timeZone} <small>({data.abbreviatedTimeZone})</small>
              </div>
              <div className="hidden md:block text-slate-400">
                {data.region}
              </div>
            </header>

            <div className="relative w-full">
              <div
                className="absolute top-0"
                style={{
                  width: `${24 * unit}%`,
                  left: `${(data.numericOffset + 11) * unit}%`,
                }}
              >
                <Line />
              </div>
            </div>
          </React.Fragment>
        ))}
      </section>
    </main>
  );
}

function Line() {
  return (
    <div className="relative h-3 w-full text-white">
      <div className="absolute h-3 w-[2px] left-0 top-0 bg-current" />
      <div className="absolute h-3 w-[2px] right-0 top-0 bg-current" />
      <div className="absolute h-[2px] w-full bg-current" />
      <div className="absolute h-2 w-[1px] left-1/2 transform -translate-x-1/2 top-0 bg-current" />
    </div>
  );
}

////////////////////////////////
// #region . utils
////////////////////////////////

function getNumericOffset(offset) {
  if (!offset) return 0;
  const [hour, minute] = (offset.replace("GMT", "") || "0")
    .split(":")
    .map(Number);

  if (!minute) return hour;

  let result = Math.abs(hour) + Math.abs(minute) / 60;

  return hour < 0 ? -result : +result;
}

function getAllTimezones() {
  let timezones = [];

  for (let region of Intl.supportedValuesOf("timeZone")) {
    const result = {};

    Intl.DateTimeFormat(undefined, { timeZone: region, timeZoneName: "long" })
      .formatToParts()
      .forEach((part) => {
        if (part.type === "timeZoneName") {
          result.region = region;
          result.timeZone = part.value;
        }
      });

    Intl.DateTimeFormat(undefined, { timeZone: region, timeZoneName: "short" })
      .formatToParts()
      .forEach((part) => {
        if (part.type === "timeZoneName") {
          result.abbreviatedTimeZone = part.value;
        }
      });

    Intl.DateTimeFormat(undefined, {
      timeZone: region,
      timeZoneName: "shortOffset",
    })
      .formatToParts()
      .forEach((part) => {
        if (part.type === "timeZoneName") {
          const offset = part.value;
          result.offset = offset;
          result.numericOffset = getNumericOffset(offset);
        }
      });

    timezones.push(result);
  }

  timezones.sort((a, b) => {
    if (a.numericOffset === b.numericOffset) return 0;
    if (a.numericOffset > b.numericOffset) return 1;
    if (a.numericOffset < b.numericOffset) return -1;
  });

  return timezones;
}

////////////////////////////////
// #region . Main IO
////////////////////////////////

function main() {
  const zones = getAllTimezones();

  console.log(zones);

  const earliestOffset = zones[0].numericOffset;
  const latestOffset = zones[zones.length - 1].numericOffset;
  const fullDay = 24;
  const fullSize =
    Math.abs(earliestOffset) + Math.abs(latestOffset) + fullDay + 1;

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App zones={zones} fullSize={fullSize} />);
}

main();
