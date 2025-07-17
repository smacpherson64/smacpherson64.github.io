export default function Page() {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/styles.css" />
        <link rel="icon" type="image/png" href="/favicon_128.png" />
      </head>

      <body>
        <form
          className="group/form p-10 bg-yellow-100 invalid:bg-red-100"
          data-submitted
          data-blurred
          data-changed
        >
          <fieldset
            className="group/fieldset p-10 bg-yellow-200 invalid:bg-red-200"
            data-submitted
            data-blurred
            data-changed
          >
            <fieldset
              className="group/field p-10 bg-yellow-300 invalid:bg-red-300 flex flex-col"
              data-submitted
              data-blurred
              data-changed
            >
              <label className="text-sm group-invalid/field:group-data-[blurred]/field:text-red-500">
                abcdefg
              </label>
              <input
                required
                className="invalid:data-[blurred]:bg-red-200"
                data-changed
              />
              <div className="invisible group-invalid/field:visible text-xs text-red-600">
                Required
              </div>
            </fieldset>
            <fieldset
              className="group/field p-10 bg-yellow-300 invalid:bg-red-300 flex flex-col"
              data-submitted
              data-blurred
              data-changed
            >
              <label className="text-sm group-invalid/field:group-data-[blurred]/field:text-red-500">
                abcdefg
              </label>
              <input
                required
                className="invalid:data-[blurred]:bg-red-200"
                data-changed
              />
              <div className="invisible group-invalid/field:visible text-xs text-red-600">
                Required
              </div>
            </fieldset>
          </fieldset>

          <fieldset
            className="group/field p-10 bg-yellow-300 invalid:bg-red-300 flex flex-col"
            data-submitted
            data-blurred
            data-changed
          >
            <label className="text-sm group-invalid/field:group-data-[blurred]/field:text-red-500">
              abcdefg
            </label>
            <input
              required
              className="invalid:data-[blurred]:bg-red-200"
              data-changed
            />
            <div className="invisible group-invalid/field:visible text-xs text-red-600">
              Required
            </div>
          </fieldset>

          <div className="invisible group-data-[submitted]/form:visible">
            Sent!
          </div>
          <div className="invisible group-data-[blurred]/form:visible">
            Blurred!
          </div>
          <div className="invisible group-data-[changed]/form:visible">
            Changed!
          </div>
        </form>

        <div className="group has-[:checked]:bg-red-500 has-[:checked]:text-2xl">
          <label>
            <input type="checkbox" /> a quick test
          </label>
          <div className="group-has-[:checked]:text-white text-gray-500">
            abc
          </div>
        </div>
      </body>
    </html>
  );
}
