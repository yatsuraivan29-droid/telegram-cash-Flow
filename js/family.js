export function family(data) { 
    return `
    <div class="family">
        <h1>Family</h1>
        <p>supa:<pre>${JSON.stringify(data.supabase, null, 2)}</pre></p>
    </div>
    `
}  