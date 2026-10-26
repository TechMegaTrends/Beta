TECHMEGATRENDS — V20 COMPLETE WEBSITE PACKAGE BUILDER
===================================================
This package includes the approved London cinematic hero (MP4, WebM, JPG)
and a script that makes the FULL WEBSITE SOURCE ZIP from your checked-out
TechMegaTrends/Beta feature/v20-premium-landing branch.

1. Extract the package to e.g. C:\Users\jefyt\Downloads\TechMegaTrends-V20-KIT
2. Open PowerShell in that extracted folder.
3. Run:
   powershell -ExecutionPolicy Bypass -File .\BUILD-COMPLETE-V20.ps1
4. Output appears in Downloads as TechMegaTrends-V20-COMPLETE-WEBSITE.zip.
5. To update GitHub PR #10, go to your Beta repo and run:
   git push origin feature/v20-premium-landing

The kit itself is NOT a copy of the complete repository. The script combines
these assets with your up-to-date GitHub source (already cloned locally) to
create the complete source ZIP. It does not merge or deploy production.
Never put .env files or private credentials in a source ZIP.
