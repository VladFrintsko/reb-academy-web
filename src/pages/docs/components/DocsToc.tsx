export const DocsToc = () => {
  return (
    <div className="text-sm">
      <div className="mb-3 text-xs font-semibold uppercase text-white/50">
        On this page
      </div>

      <div className="space-y-2">
        <a className="block text-white/70 hover:text-white" href="#create-account">
          Create a Lakera Account
        </a>
        <a className="block text-white/70 hover:text-white" href="#setup-guard">
          Setting up Lakera Guard
        </a>
        <a className="block text-white/70 hover:text-white" href="#create-key">
          Create an API Key
        </a>
      </div>
    </div>
  );
}
